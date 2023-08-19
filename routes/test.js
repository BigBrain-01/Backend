import express from "express"
import { addParticipants, createTest } from "../controllers/test.js";
const router = express.Router()

router.post('/',createTest)
router.post('/:testId/register',addParticipants)

export default router;