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

  async findById(id: number) {
    return prisma.url.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string, domainId: number) {
    return prisma.url.findUnique({
      where: {
        domainId_slug: {
          domainId,
          slug,
        },
      },
    });
  }

  async update(
    urlId: number,
    data: {
      slug?: string;
      destinationUrl?: string;
      isActive?: boolean;
    },
  ) {
    return prisma.url.update({
      where: { id: urlId },
      data,
    });
  }

  async delete(urlId: number) {
    return prisma.url.delete({
      where: { id: urlId },
    });
  }
}

const urlRepository = new UrlRepository();
export default urlRepository;
