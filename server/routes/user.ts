import { Router } from "express";

import protect from "../middlewares/protect";
import { follow, unfollow } from "../controllers/user";

const router = Router();

router.use(protect);

router.put("/:userId/follow", follow);
router.put("/:userId/unfollow", unfollow);

export default router;
