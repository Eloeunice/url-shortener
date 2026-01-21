import { prisma } from '../../config/prisma.js';
import { type CreateDomainDTO, type UpdateDomainDTO } from './domain.dto.js';

export class DomainRepository {
  async create(userId: number, dto: CreateDomainDTO) {
    return prisma.domain.create({
      data: {
        authorId: userId,
        name: dto.name,
        subdomain: dto.subdomain || null,
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
  async findById(domainId: number) {
    return prisma.domain.findUnique({
      where: {
        id: domainId,
      },
    });
  }

  async update(domainId: number, dto: UpdateDomainDTO) {
    const data = {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.subdomain !== undefined && { subdomain: dto.subdomain }),
      ...(dto.isActive !== undefined && { isActive: dto.isActive }),
    };

    return prisma.domain.update({
      where: { id: domainId },
      data,
    });
  }
  async delete(domainId: number) {
    return prisma.domain.delete({
      where: { id: domainId },
    });
  }
}

const domainRepository = new DomainRepository();

export default domainRepository;
