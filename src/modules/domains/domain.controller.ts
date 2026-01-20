import { type Request, type Response } from 'express';
import domainService from './domain.service.js';
import { createDomainSchema } from './domain.schema.js';

export class DomainController {
  async create(req: Request, res: Response) {
    const { name, subdomain, userId } = createDomainSchema.parse(req.body);

    const domain = await domainService.create(name, userId, subdomain);

    return res.status(201).json({
      message: 'Domain created',
      domain,
    });
  }
  async update(req: Request, res: Response) {
    // alterar o status do dominio
    const { name, userId, subdomain, isActive } = req.body;

    const domain = await domainService.update(name, userId, subdomain, isActive);
    return res.json({ message: 'Domain updated', domain });
  }
  async delete(req: Request, res: Response) {
    // colocar o atribiuto isDeleted para true
    // status do dominio para inativo
    const { name, userId, isDeleted } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const domain = await domainService.delete(name, userId, isDeleted);
    return res.json({ message: 'Domain deleted' });
  }
}

export const domainController = new DomainController();

export default domainController;
