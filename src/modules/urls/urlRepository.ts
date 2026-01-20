import { prisma } from '../../config/prisma.js';

export class UrlRepository {
  async create(domainId: number, slug: string, destinationUrl: string) {
    return prisma.url.create({
      data: {
        domainId,
        slug,
        destinationUrl,
      },
    });
  }

  async findBySlug(slug: string, domainId: number) {
    return prisma.url.findUnique({
      where: { domainId_slug: { slug, domainId } },
    });
  }

  async update(urlId: number, data: { domainId?: number; slug?: string; destinationUrl?: string }) {
    return prisma.url.update({
      where: {
        id: urlId,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.url.delete({ where: { id } });
  }
}

const urlRepository = new UrlRepository();
export default urlRepository;
