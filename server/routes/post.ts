import { Router } from "express";

import protect from "../middlewares/protect";
import { createPost, updatePost } from "../controllers/post";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(() => {})
  .post(createPost);

router
  .route("/:postId")
  .get(() => {})
  .put(updatePost)
  .delete(() => {});

export default router;
