import urlRepository from './urlRepository.js';
import domainRepository from '../domains/domain.repository.js';
import { type CreateUrlDto, type UpdateUrlDto } from './url.dto.js';

export class UrlService {
  // CREATE
  async create(userId: number, domainId: number, dto: CreateUrlDto) {
    const domain = await domainRepository.findById(domainId);

    if (!domain || domain.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    const slugFinal = await this.getUniqueSlug(domainId, dto.slug);

    const shortenedUrl = `https://www.${domain.name}/${slugFinal}`;

    const url = await urlRepository.create(domainId, slugFinal, dto.destinationUrl);

    return { shortenedUrl, url };
  }

  // UPDATE
  async update(userId: number, urlId: number, dto: UpdateUrlDto) {
    const url = await urlRepository.findById(urlId);

    if (!url) {
      throw new Error('Url not found');
    }

    const domain = await domainRepository.findById(url.domainId);

    if (!domain || domain.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    const data = {
      ...(dto.slug !== undefined && { slug: dto.slug }),
      ...(dto.destinationUrl !== undefined && {
        destinationUrl: dto.destinationUrl,
      }),
      ...(dto.isActive !== undefined && {
        isActive: dto.isActive,
      }),
    };

    return urlRepository.update(urlId, data);
  }

  // DELETE
  async delete(userId: number, urlId: number) {
    const url = await urlRepository.findById(urlId);

    if (!url) {
      throw new Error('Url not found');
    }

    const domain = await domainRepository.findById(url.domainId);

    if (!domain || domain.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    await urlRepository.delete(urlId);
  }

  // ===== helpers =====

  private async slugGenerator(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let slug = '';

    for (let i = 0; i < length; i++) {
      slug += chars[Math.floor(Math.random() * chars.length)];
    }

    return slug;
  }

  private async getUniqueSlug(domainId: number, slug?: string) {
    if (slug) {
      const exists = await urlRepository.findBySlug(slug, domainId);
      if (exists) throw new Error('Slug already exists');
      return slug;
    }

    while (true) {
      const generated = await this.slugGenerator();
      const exists = await urlRepository.findBySlug(generated, domainId);
      if (!exists) return generated;
    }
  }
}

const urlService = new UrlService();
export default urlService;
