import express from 'express';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import softwareRoutes from './routes/softwareRoutes';
import requestRoutes from './routes/requestRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/request', requestRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
