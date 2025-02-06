import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import supervisorRoutes from './routes/supervisorRoutes';
import transcriptRoutes from './routes/transcriptRoutes';
import MarksRoutes from './routes/MarksRoutes';
import marksCalculationRoutes from './routes/marksCalculationRoutes';
import seatingRoutes from './routes/seatingArrangementRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Update this if your frontend URL is different
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log('Request Body:', req.body);
  }
  next();
});

// Register routes
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/transcript', transcriptRoutes);
app.use('/api/marks', MarksRoutes);
app.use('/api/marks-calculation', marksCalculationRoutes);
app.use('/api/seating', seatingRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Backend is running...' });
});

// Catch-all middleware for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Export app
export default app;
