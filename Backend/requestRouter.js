import { Router } from "express";
import { genAI } from "./controller.js";

const router = Router();

router.route("/request").post(genAI);

export default router;
