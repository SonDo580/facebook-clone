import { Router } from "express";

import protect from "../middlewares/protect";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(() => {})
  .post(() => {})
  .put(() => {})
  .delete(() => {});

export default router;
