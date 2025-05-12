import { Router } from 'express';
import {
  getSudentsController,
  getStudentsByIdController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/students', ctrlWrapper(getSudentsController));

router.get('/api/students/:studentId', ctrlWrapper(getStudentsByIdController));

export default router;
