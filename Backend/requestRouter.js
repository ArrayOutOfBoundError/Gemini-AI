import { Router } from "express";
import { genAI } from "./controller.js";
import upload from "./multer.js";
const router = Router();

router.route("/request").post(upload.single("file"),genAI);

export default router;
