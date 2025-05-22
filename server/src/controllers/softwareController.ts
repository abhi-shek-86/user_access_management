import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Software } from '../entities/Software';

export const createSoftware = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Software);
  const { name, description, accessLevels } = req.body;
  const software = repo.create({ name, description, accessLevels });
  await repo.save(software);
  res.json(software);
};

export const getAllSoftware = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Software);
  const softwares = await repo.find();
  res.json(softwares);
};
