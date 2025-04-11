import { proofverifier } from '../controllers/vp.controller.js';
import express from 'express';

const router = express.Router();

router.post("/", proofverifier)

export default router;