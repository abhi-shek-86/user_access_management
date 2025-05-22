// src/config/data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Software } from '../entities/Software';
import { Request } from '../entities/Request';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Software, Request],
  migrations: [],
  subscribers: [],
});
