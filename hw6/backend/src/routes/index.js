import { Router } from "express";
// import ScoreCardRouter from "./scoreCard0";
import ScoreCardRouter from "./scoreCard";

const router = Router();
router.use('/', ScoreCardRouter);

export default router;