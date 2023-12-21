import { Router } from "express";

import protect from "../middlewares/protect";
import {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  unfriend,
  friendList,
  requestList,
} from "../controllers/friend";

const router = Router();

router.use(protect);

router.get("/", friendList);
router.get("/requests", requestList);

router.put("/:userId/sendRequest", sendRequest);
router.put("/:userId/cancelRequest", cancelRequest);
router.put("/:userId/acceptRequest", acceptRequest);
router.put("/:userId/rejectRequest", rejectRequest);
router.put("/:userId/unfriend", unfriend);

export default router;
