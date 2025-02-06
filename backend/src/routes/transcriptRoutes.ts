import { Router } from 'express';
import { saveTranscript, getTranscript } from '../controllers/transcriptController';

const router = Router();

// POST /api/transcript/
router.post('/', saveTranscript);

// GET /api/transcript/:sapId
router.get('/:sapId', getTranscript);

export default router;
