import express from "express"
import { createQuestion } from "../controllers/question.js";
const router = express.Router()

router.post('/:testId',createQuestion)

export default router;