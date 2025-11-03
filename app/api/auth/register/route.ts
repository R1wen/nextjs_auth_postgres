// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Notre client Prisma

// Fonction POST pour gérer les requêtes d'enregistrement
export async function POST(req: Request) {
  try {
    // 1. Récupérer les données du corps de la requête
    const body = await req.json();
    const { email, password, name } = body;

    // Validation basique
    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

    // 2. Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Cet email est déjà enregistré' }, { status: 409 }); // 409 Conflict
    }

    // 3. Hacher le mot de passe (Salting et Hashing)
    const salt = await bcrypt.genSalt(10); // Génère un "salt" de 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Enregistrer le nouvel utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // On stocke le mot de passe HACHÉ
        name,
      },
      select: { // On ne retourne pas le mot de passe
        id: true,
        email: true,
        name: true,
      }
    });

    // 5. Répondre avec succès
    return NextResponse.json(newUser, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  }
}