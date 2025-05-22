// src/app.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import softwareRoutes from './routes/softwareRoutes';
import requestRoutes from './routes/requestRoutes';
import { User } from './entities/User';
import { Software } from './entities/Software';
import { hashPassword } from './utils/hash';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/request', requestRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    // --- Add Default Admin User ---
    const userRepo = AppDataSource.getRepository(User);
    const adminExists = await userRepo.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashed = await hashPassword('admin123');
      const admin = userRepo.create({
        username: 'admin',
        password: hashed,
        role: 'Admin',
        email: 'admin@yourdomain.com' // <-- Add this line
      });
      await userRepo.save(admin);
      console.log('✅ Default admin user created: username=admin, password=admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    // --- End Add Default Admin User ---

    // --- Add Default Software ---
    const softwareRepo = AppDataSource.getRepository(Software);
    const defaultSoftware = await softwareRepo.findOne({ where: { name: 'Test Software' } });
    if (!defaultSoftware) {
      const software = softwareRepo.create({
        name: 'Test Software',
        description: 'This is a default software for testing.',
        accessLevels: ['Read', 'Write', 'Admin']
      });
      await softwareRepo.save(software);
      console.log('✅ Default software created: Test Software');
    } else {
      console.log('ℹ️ Default software already exists');
    }
    // --- End Add Default Software ---

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error during Data Source initialization', err);
  });


