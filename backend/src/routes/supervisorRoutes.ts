import express from 'express';
import * as supervisorController from '../controllers/supervisorController';

const router = express.Router();

router.post('/add', supervisorController.addSupervisor);
router.get('/', supervisorController.getAllSupervisors);
router.post('/assign', supervisorController.assignSupervisor);
router.get('/assignments', supervisorController.getAllAssignments);

export default router;
