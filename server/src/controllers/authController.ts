import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  const repo = AppDataSource.getRepository(User);

  const existingEmail = await repo.findOne({ where: { email } });
  if (existingEmail) {
    res.status(400).json({ message: 'Email exists' });
    return;
  }
  const existingUsername = await repo.findOne({ where: { username } });
  if (existingUsername) {
    res.status(400).json({ message: 'Username exists' });
    return;
  }

  const allowedRoles = ['Employee', 'Manager'];
  const userRole = allowedRoles.includes(role) ? role : 'Employee';

  const hashed = await hashPassword(password);
  const user = repo.create({ email, username, password: hashed, role: userRole });
  await repo.save(user);

  res.json({ message: 'Registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const repo = AppDataSource.getRepository(User);

  // Try to find by username or email
  const user = await repo.findOne({
    where: [
      { username: username },
      { email: username }
    ]
  });

  if (!user) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    res.status(401).json({ message: 'Wrong password' });
    return;
  }

  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token, role: user.role, username: user.username });
};
