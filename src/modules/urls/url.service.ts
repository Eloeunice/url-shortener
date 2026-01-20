import urlRepository from './urlRepository.js';

export class UrlService {
  async create(domainId: number, destinationUrl: string, slug?: string) {}

  async update(domainId: number, finalSlug: string) {}

  async delete(id: number) {}
}

const urlService = new UrlService();
export default urlService;
