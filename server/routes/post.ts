import { Router } from "express";

import protect from "../middlewares/protect";
import {
  createPost,
  deletePost,
  getPost,
  postList,
  updatePost,
  reactToPost,
} from "../controllers/post";

const router = Router();

router.use(protect);

router.route("/").get(postList).post(createPost);

router.route("/:postId").get(getPost).put(updatePost).delete(deletePost);

router.put("/:postId/reacts", reactToPost);

export default router;
