import express from "express"
import { addParticipants, createTest, getTest } from "../controllers/test.js";
import { getTestID } from "../middleware/test.js";
const router = express.Router()

router.post('/',getTestID,createTest)
router.post('/:testId/register',addParticipants)
router.get('/:testId',getTest)

export default router;