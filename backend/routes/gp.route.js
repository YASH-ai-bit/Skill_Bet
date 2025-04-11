import { proofgenerator } from '../controllers/gp.controller.js';
import express from 'express';

const router = express.Router();

router.post("/", proofgenerator);

export default router;