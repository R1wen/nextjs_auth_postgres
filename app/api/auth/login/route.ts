import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
    }

    return NextResponse.json({ 
        message: 'Connexion réussie',
        user: { id: user.id, email: user.email, name: user.name }
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  }
}