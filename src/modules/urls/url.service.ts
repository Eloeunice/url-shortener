import urlRepository from './urlRepository.js';

export class UrlService {
  async create(domainId: number, destinationUrl: string, slug?: string) {
    const slugFinal = await this.getUniqueSlug(domainId, slug);
    return await urlRepository.create(domainId, slugFinal, destinationUrl);
  }

  async slugGenerator(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let slugGenerated = '';
    // parsear a variavel char e de forma aleatoria acrescentar na slugGenerated
    for (let index = 0; index < chars.length; index++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      slugGenerated += chars[randomIndex];
    }
    return slugGenerated;
  }

  async getUniqueSlug(domainId: number, slug?: string) {
    if (slug) {
      const slugExists = await urlRepository.findBySlug(slug, domainId);
      if (slugExists) {
        throw new Error('Slug already exists');
      }
      return slug;
    }

    while (true) {
      const generatedSlug = await this.slugGenerator();
      const slugExists = await urlRepository.findBySlug(generatedSlug, domainId);

      if (!slugExists) {
        return generatedSlug;
      }
    }
  }

  async update(id: number, domainId?: number, finalSlug?: string, destinationUrl?: string) {
    const data: any = {};
    if (domainId !== undefined) data.domainId = domainId;
    if (finalSlug !== undefined) data.slug = finalSlug;
    if (destinationUrl !== undefined) data.destinationUrl = destinationUrl;

    return await urlRepository.update(id, data);
  }

  async delete(id: number) {
    return await urlRepository.delete(id);
  }
}

const urlService = new UrlService();
export default urlService;
