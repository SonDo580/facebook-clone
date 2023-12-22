import { Router } from "express";

import protect from "../middlewares/protect";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(() => {})
  .post(() => {});

router
  .route("/:postId")
  .get(() => {})
  .put(() => {})
  .delete(() => {});

export default router;
