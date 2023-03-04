import { PrismaClient } from '@prisma/client';
import { User, UserAccount } from '../interfaces/user.interface';
import { creationHash } from '../utils/hash';

export const getUserUsernameByEmail = async (account: string) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: account,
        },
        {
          email: account,
        },
      ],
    },
  });

  return user;
};

export const readUser = async (userId: number) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
};

export const readUsers = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where: {
      isActive: true,
    },
  });

  return users;
};

export const insertUser = async (user: UserAccount) => {
  const prisma = new PrismaClient();

  const password = await creationHash(user.password);

  const data = await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password,
    },
  });

  return data;
};

export const updatedUser = async (userId: number, user: User) => {
  const prisma = new PrismaClient();

  const data = await prisma.user.update({
    where: {
      userId,
    },
    data: {
      username: user.username,
      email: user.email,
      isActive: user.isActive,
    },
  });

  return data;
};
