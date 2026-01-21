import { type Request, type Response } from 'express';
import urlService from './url.service.js';
import { type CreateUrlDto, type UpdateUrlDto } from './url.dto.js';
import { createUrlSchema, updateUrlSchema } from './url.schema.js';

export class UrlController {
  // POST /domains/:domainId/urls
  async create(req: Request, res: Response) {
    const dto: CreateUrlDto = createUrlSchema.parse(req.body);

    const userId = req.user.id;

    const domainId = Number(req.params.domainId);
    if (Number.isNaN(domainId)) {
      return res.status(400).json({ message: 'Invalid domain id' });
    }

    const url = await urlService.create(userId, domainId, dto);

    return res.status(201).json({
      message: 'Url criada',
      url,
    });
  }

  // PUT /urls/:urlId
  async update(req: Request, res: Response) {
    const dto: UpdateUrlDto = updateUrlSchema.parse(req.body);

    const userId = req.user.id;

    const urlId = Number(req.params.urlId);
    if (Number.isNaN(urlId)) {
      return res.status(400).json({ message: 'Invalid url id' });
    }

    const url = await urlService.update(userId, urlId, dto);

    return res.json({
      message: 'Url atualizada',
      url,
    });
  }

  // DELETE /urls/:urlId
  async delete(req: Request, res: Response) {
    const userId = req.user.id;

    const urlId = Number(req.params.urlId);
    if (Number.isNaN(urlId)) {
      return res.status(400).json({ message: 'Invalid url id' });
    }

    await urlService.delete(userId, urlId);

    return res.json({
      message: 'Url apagada',
    });
  }
}

const urlController = new UrlController();
export { urlController };
