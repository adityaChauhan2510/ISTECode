import express from "express";
//import problem from "./problem.js";
import accounts from "./accounts.js";

const router = express.Router();

//router.use("/problem", problem);
router.use("/accounts", accounts);

export default router;