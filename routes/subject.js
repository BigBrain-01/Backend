import express from "express"
import { createSubject, addQuestion, deleteQuestion, deleteSubject } from "../controllers/subject.js"
const router = express.Router()

router.post('/',createSubject)
router.patch('/:subjectId/addQuestion',addQuestion)
router.delete('/:subjectId/:questionId',deleteQuestion)
router.delete('/:subjectId',deleteSubject)

export default router