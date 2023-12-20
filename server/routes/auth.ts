import { Router } from "express";

import { register, login, logout } from "../controllers/auth";
import protect from "../middlewares/protect";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
