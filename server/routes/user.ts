import { Router } from "express";

import protect from "../middlewares/protect";
import {
  getInfo,
  updateInfo,
  deleteAccount,
  follow,
  unfollow,
} from "../controllers/user";

const router = Router();

router.use(protect);

router.route("/:userId").get(getInfo).put(updateInfo).delete(deleteAccount);

router.put("/:userId/follow", follow);
router.put("/:userId/unfollow", unfollow);

export default router;
