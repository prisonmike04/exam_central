import { Router } from 'express';
import {
  generateSeating,
  getSeatingByRoom,
  updateSeat,
} from '../controllers/seatingArrangementController';

const router = Router();

// POST route to generate seating arrangement (controller from both files integrated)

router.post('/generate', generateSeating);

// GET route to fetch seating arrangement for a specific room
router.get('/room/:roomId', getSeatingByRoom);

// PUT route to update a specific seat arrangement
router.put('/:id', updateSeat);

export default router;
