import { Router } from 'express';
import {
  generateSeating,
  getSeatingByRoom,
  updateSeat,
} from '../controllers/seatingArrangementController';

const router = Router();

router.post('/generate', generateSeating);
router.get('/room/:roomId', getSeatingByRoom);
router.put('/:id', updateSeat);

export default router;
