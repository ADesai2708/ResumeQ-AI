import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadResume,
  getAllResumes,
  getResumeById,
  simulateResumeScore,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/", getAllResumes);
router.get("/:id", getResumeById);
router.get("/:resumeId/simulate-score", simulateResumeScore);

export default router;