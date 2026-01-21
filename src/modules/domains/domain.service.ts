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

  async update(domainId: number, dto: UpdateDomainDTO) {
    return domainRepository.update(domainId, dto);
  }
  async delete(domainId: number) {
    return domainRepository.delete(domainId);
  }
}

const domainService = new DomainService();
export default domainService;
