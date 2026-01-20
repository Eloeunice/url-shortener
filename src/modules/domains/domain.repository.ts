import { prisma } from '../../config/prisma.js';

export class DomainRepository {
  async create(name: string, userId: number, subdomain?: string) {
    return prisma.domain.create({
      data: {
        name,
        subdomain: subdomain || null,
        authorId: userId,
      },
    });
  }

  async findByName(name: string, userId: number) {
    return prisma.domain.findFirst({
      where: {
        name,
        authorId: userId,
      },
    });
  }
  async update(name: string, userId: number, subdomain?: string, isActive?: boolean) {
    return prisma.domain.update({
      where: {
        name,
        authorId: userId,
      },
      data: {
        subdomain: subdomain || null,
        isActive: isActive || true,
      },
    });
  }
  async delete(name: string, userId: number, isDeleted: boolean) {
    return prisma.domain.update({
      where: {
        name,
        authorId: userId,
      },
      data: {
        isDeleted,
      },
    });
  }
}

const domainRepository = new DomainRepository();

export default domainRepository;
