import { type Request, type Response } from 'express';
import domainService from './domain.service.js';
import { createDomainSchema } from './domain.schema.js';
import type { CreateDomainDTO, UpdateDomainDTO } from './domain.dto.js';

export class DomainController {
  async create(req: Request, res: Response) {
    const dto: CreateDomainDTO = createDomainSchema.parse(req.body);
    const userId = req.user.id;

    const domain = await domainService.create(userId, dto);

    return res.status(201).json({
      message: 'Domain created',
      domain,
    });
  }

  async update(req: Request, res: Response) {
    // alterar o status do dominio
    const dto: UpdateDomainDTO = req.body;
    const domainId = Number(req.params.id);

    const domain = await domainService.update(domainId, dto);
    return res.json({ message: 'Domain updated', domain });
  }
  async delete(req: Request, res: Response) {
    // colocar o atribiuto isDeleted para true
    // status do dominio para inativo
    const domainId = Number(req.params.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const domain = await domainService.delete(domainId);
    return res.json({ message: 'Domain deleted' });
  }
}

export const domainController = new DomainController();

export default domainController;
