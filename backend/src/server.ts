// backend/src/app.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import teacherAvailabilityRoutes from './routes/teacherAvailabilityRoutes';
import seatingArrangementRoutes from './routes/seatingArrangementRoutes';
import { initializeAssociations } from './models';
import sequelize from './utils/database';

dotenv.config();

const app: Application = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend on this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies or authentication headers
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher-availability', teacherAvailabilityRoutes);
app.use('/api/seating', seatingArrangementRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Initialize associations before syncing the database
    initializeAssociations();

    // Sync the database
    await sequelize.sync(); // Use { force: true } in development to reset tables if needed
    console.log('Database synchronized successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

export default app;
