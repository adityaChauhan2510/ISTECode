import express from "express";
import { authenticateToken } from "../middlewares/token.js";
import {
    userProfile 
} from "../controllers/user.js";

const router = express.Router();

router.get("/:username", authenticateToken, userProfile);


export default router;