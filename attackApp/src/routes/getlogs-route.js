import express from "express";
import { getLogs } from "../controller/dashboard.js";


const router = express.Router();
router.route("/")
.get(getLogs)
.post(getLogs);


export default router;