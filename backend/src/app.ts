import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import supervisorRoutes from './routes/supervisorRoutes';

dotenv.config();

const app: Application = express();

// Middleware for CORS and JSON parsing
app.use(cors({
  origin: '*', // Allow all origins (use specific origin in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Debug Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/supervisors', supervisorRoutes);

// Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running...');
});

// Catch-all Middleware for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default app;
