import express from 'express';
import dotenv from 'dotenv';
import { getWarlog } from '../controllers/coc.controller.js';

dotenv.config();

const COC_TOKEN = process.env.COC_TOKEN;
const router = express.Router();

router.get('/warlog/:clanTag', getWarlog);

export default router;
