import domainRepository from './domain.repository.js';

class DomainService {
  async create(name: string, userId: number, subdomain?: string) {
    const domainExists = await domainRepository.findByName(name, userId);

    if (domainExists) {
      throw new Error('Domain already exists');
    }

    return domainRepository.create(name, userId, subdomain);
  }

  async update(name: string, userId: number, isActive: boolean) {
    return domainRepository.update(name, userId, isActive);
  }
  async delete(name: string, userId: number, isDeleted: boolean) {
    return domainRepository.delete(name, userId, isDeleted);
  }
}

const domainService = new DomainService();
export default domainService;
