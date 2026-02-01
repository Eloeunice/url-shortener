import type { CreateDomainDTO, UpdateDomainDTO } from './domain.dto.js';
import domainRepository from './domain.repository.js';

class DomainService {
  async create(userId: number, dto: CreateDomainDTO) {
    const domainExists = await domainRepository.findByName(dto.name, userId);

    if (domainExists) {
      throw new Error('Domain already exists');
    }

    return domainRepository.create(userId, dto);
  }

  async update(userId: number, domainId: number, dto: UpdateDomainDTO) {
    const domain = await domainRepository.findById(domainId);

    if (!domain) {
      throw new Error('Domain not found');
    }

    if (domain.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    return domainRepository.update(domainId, dto);
  }

  async delete(userId: number, domainId: number) {
    const domain = await domainRepository.findById(domainId);

    if (!domain) {
      throw new Error('Domain not found');
    }

    if (domain.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    return domainRepository.delete(domainId);
  }
}

const domainService = new DomainService();
export default domainService;
