import { Router } from "express";

import protect from "../middlewares/protect";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  follow,
  friendRequest,
  rejectFriendRequest,
  unfollow,
  unfriend,
} from "../controllers/user";

const router = Router();

router.use(protect);

router.put("/:userId/follow", follow);
router.put("/:userId/unfollow", unfollow);

router.put("/:userId/friendRequest", friendRequest);
router.put("/:userId/cancelFriendRequest", cancelFriendRequest);
router.put("/:userId/acceptFriendRequest", acceptFriendRequest);
router.put("/:userId/rejectFriendRequest", rejectFriendRequest);
router.put("/:userId/unfriend", unfriend);

export default router;
