import { type Request, type Response } from 'express';
import urlService from './url.service.js';

export class UrlController {
  async create(req: Request, res: Response) {
    const { domainId, slug, destinationUrl } = req.body;
    // verificar se a destinationUrl é válida
    const url = await urlService.create(domainId, slug, destinationUrl);
    return res.status(201).json({ message: 'Url criada:', url });
  }

  async update(req: Request, res: Response) {
    const { destinationUrl, isActive } = req.body;
    const url = await urlService.update(destinationUrl, isActive);
    return res.json({ message: 'Url Atualizada', url });
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = await urlService.delete(id);
    return res.json({ message: 'Url APagada' });
  }
}

const urlController = new UrlController();
export { urlController };
