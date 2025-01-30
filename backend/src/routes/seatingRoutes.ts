import express from 'express';
import { generateSeatingArrangement } from '../controllers/seatingController';

const router = express.Router();

// Define the route properly
router.post('/arrange', generateSeatingArrangement);

export default router;
