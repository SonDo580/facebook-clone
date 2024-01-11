import { Router } from "express";

import protect from "../middlewares/protect";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
  reactToPost,
  getFeedPosts,
} from "../controllers/post";

const router = Router();

router.use(protect);

router.route("/").get(getFeedPosts).post(createPost);

router.route("/:postId").get(getPost).put(updatePost).delete(deletePost);

router.put("/:postId/reacts", reactToPost);

export default router;
