import { type Request, type Response } from 'express';
import domainService from './domain.service.js';
import { createDomainSchema } from './domain.schema.js';
import type { CreateDomainDTO, UpdateDomainDTO } from './domain.dto.js';

export class DomainController {
  async create(req: Request, res: Response) {
    try {
      const dto: CreateDomainDTO = createDomainSchema.parse(req.body);

      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

      const userId = req.user.id;

      const domain = await domainService.create(userId, dto);

      return res.status(201).json({
        message: 'Domain created',
        domain,
      });
    } catch (error: any) {
      if (error.message === 'Domain already exists') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

      const dto: UpdateDomainDTO = req.body;
      const domainId = Number(req.params.domainId);

      if (Number.isNaN(domainId)) {
        return res.status(400).json({ message: 'Invalid domain id' });
      }

      const userId = req.user.id;
      const domain = await domainService.update(userId, domainId, dto);
      return res.json({ message: 'Domain updated', domain });
    } catch (error: any) {
      if (error.message === 'Domain not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Unauthorized') {
        return res.status(403).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

      const domainId = Number(req.params.domainId);

      if (Number.isNaN(domainId)) {
        return res.status(400).json({ message: 'Invalid domain id' });
      }

      const userId = req.user.id;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const domain = await domainService.delete(userId, domainId);
      return res.json({ message: 'Domain deleted' });
    } catch (error: any) {
      if (error.message === 'Domain not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Unauthorized') {
        return res.status(403).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }
}

export const domainController = new DomainController();

export default domainController;
