import express from "express";
import {
  getAvailableRoles,
  roleMatchResume,
  jdMatchResume,
} from "../controllers/jdController.js";

const router = express.Router();

router.get("/roles", getAvailableRoles);
router.post("/role-match", roleMatchResume);
router.post("/jd-match", jdMatchResume);

export default router;