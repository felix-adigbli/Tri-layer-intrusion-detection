import express from "express";
import { createAttack, getAttack } from "../controller/create-attack.js";


const router = express.Router();
router.route("/")
.get(getAttack)
.post(createAttack);


export default router;