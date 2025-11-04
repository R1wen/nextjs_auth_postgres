import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Cet email est déjà enregistré' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  }
}