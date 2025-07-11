import express from 'express';
import authRoutes from './routes/auth';
import invoiceRoutes from './routes/invoice';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/invoice', invoiceRoutes);
  app.get('/', (req, res) => res.send('API is running'));
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
