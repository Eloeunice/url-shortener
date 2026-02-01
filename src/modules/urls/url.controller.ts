import { type Request, type Response } from 'express';
import urlService from './url.service.js';
import { type CreateUrlDto, type UpdateUrlDto } from './url.dto.js';
import { createUrlSchema, updateUrlSchema } from './url.schema.js';

export class UrlController {
  // POST /domains/:domainId/urls
  async create(req: Request, res: Response) {
    try {
      const dto: CreateUrlDto = createUrlSchema.parse(req.body);

      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

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
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === 'Slug already exists') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  // PUT /urls/:urlId
  async update(req: Request, res: Response) {
    try {
      const dto: UpdateUrlDto = updateUrlSchema.parse(req.body);

      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

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
    } catch (error: any) {
      if (error.message === 'Url not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Unauthorized') {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === 'Slug already exists') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  // DELETE /urls/:urlId
  async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

      const userId = req.user.id;

      const urlId = Number(req.params.urlId);
      if (Number.isNaN(urlId)) {
        return res.status(400).json({ message: 'Invalid url id' });
      }

      await urlService.delete(userId, urlId);

      return res.json({
        message: 'Url apagada',
      });
    } catch (error: any) {
      if (error.message === 'Url not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Unauthorized') {
        return res.status(403).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }
}

const urlController = new UrlController();
export { urlController };
