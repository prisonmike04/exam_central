import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './utils/database';
import { initializeAssociations } from './models'; // Ensure associations are initialized

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Update this URL to match your frontend if different
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies or authentication headers
    optionsSuccessStatus: 200,
  })
);

// Middleware configuration
app.use(bodyParser.json());

// Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log('Request Body:', req.body);
  }
  next();
});

// Import all routes
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import teacherAvailabilityRoutes from './routes/teacherAvailabilityRoutes';
import supervisorRoutes from './routes/supervisorRoutes';
import transcriptRoutes from './routes/transcriptRoutes';
import MarksRoutes from './routes/MarksRoutes';
import marksCalculationRoutes from './routes/marksCalculationRoutes';
import seatingRoutes from './routes/seatingArrangementRoutes';

// Register all routes
app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher-availability', teacherAvailabilityRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/transcript', transcriptRoutes);
app.use('/api/marks', MarksRoutes);
app.use('/api/marks-calculation', marksCalculationRoutes);
app.use('/api/seating', seatingRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running.' });
});

// Catch-all middleware for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Sync the database and start the server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Initialize associations before syncing the database
    initializeAssociations();

    // Sync the database
    await sequelize.sync(); // Use { force: true } in development to reset tables if needed
    console.log('Database synchronized successfully.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

export default app;
