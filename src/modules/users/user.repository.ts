import { prisma } from '../../config/prisma.js';

interface CreateUserData {
  email: string;
  password: string; // já vem com hash
  name: string;
}

interface UpdateUserData {
  password?: string;
  name?: string;
}

export class UserRepository {
  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async updateByEmail(email: string, data: UpdateUserData) {
    return prisma.user.update({
      where: { email },
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async deleteByEmail(email: string) {
    return prisma.user.delete({
      where: { email },
    });
  }
}
