import express from "express";
const router = express.Router()
import { getCourses, createCourse, addVideo } from "../controllers/course.js";

router.post("/", createCourse);
router.patch("/:id/addVideo", addVideo);
router.get("/", getCourses);

export default router;

