import { Router } from "express";

import protect from "../middlewares/protect";
import {
  acceptRequest,
  cancelRequest,
  friendRequest,
  rejectRequest,
  unfriend,
} from "../controllers/friend";

const router = Router();

router.use(protect);

router.put("/:userId/request", friendRequest);
router.put("/:userId/cancelRequest", cancelRequest);
router.put("/:userId/acceptRequest", acceptRequest);
router.put("/:userId/rejectRequest", rejectRequest);
router.put("/:userId/unfriend", unfriend);

export default router;
