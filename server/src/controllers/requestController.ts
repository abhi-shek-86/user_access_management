import { Request as Req, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Request as AccessRequest } from '../entities/Request';
import { User } from '../entities/User';
import { Software } from '../entities/Software';

export const submitRequest = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const userRepo = AppDataSource.getRepository(User);
  const softwareRepo = AppDataSource.getRepository(Software);

  const user = await userRepo.findOneBy({ id: (req as any).user.id });
  const software = await softwareRepo.findOneBy({ id: req.body.softwareId });

  const request = repo.create({
    user: user!,
    software: software!,
    accessType: req.body.accessType,
    reason: req.body.reason,
    status: 'Pending'
  });

  await repo.save(request);
  res.json(request);
};

export const updateRequestStatus = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const request = await repo.findOneBy({ id: Number(req.params.id) });

  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = req.body.status;
  await repo.save(request);
  res.json(request);
};

export const getPendingRequests = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const requests = await repo.find({
    where: { status: 'Pending' },
    relations: ['user', 'software'],
  });
  res.json(requests);
};

export const getMyRequests = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const requests = await repo.find({
    where: { user: { id: (req as any).user.id } },
    relations: ['software'],
    order: { id: 'DESC' }
  });
  res.json(requests);
};

export const deleteRequest = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const request = await repo.findOne({
    where: { id: Number(req.params.id) },
    relations: ['user'],
  });

  // Only allow the owner (employee) to delete their own request if it's still pending
  if (!request || request.user.id !== (req as any).user.id || request.status !== 'Pending') {
    return res.status(403).json({ message: 'Forbidden or request not found' });
  }

  await repo.remove(request);
  res.json({ message: 'Request deleted' });
};

export const getHistoryRequests = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const requests = await repo.find({
    where: [
      { status: 'Approved' },
      { status: 'Rejected' }
    ],
    relations: ['user', 'software'],
    order: { id: 'DESC' }
  });
  res.json(requests);
};

export const managerDeleteRequest = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  const request = await repo.findOne({ where: { id: Number(req.params.id) } });
  if (!request) return res.status(404).json({ message: 'Request not found' });
  await repo.remove(request);
  res.json({ message: 'Request deleted' });
};
