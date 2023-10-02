import express from "express";

import { getCourses, createCourse } from "../controllers/course.js";

router.post("/create", createCourse);
router.get("/", getCourses);

export default router;

