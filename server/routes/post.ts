import { Router } from "express";

import protect from "../middlewares/protect";
import { createPost, deletePost, updatePost } from "../controllers/post";

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
  .delete(deletePost);

export default router;
