import { handleServiceError } from "@/utils/error";
import { Post } from "@/types/post";
import { axiosInstance } from "./request";

const URL = "/posts";

const getFeedPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<Post[]>(URL);
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const createPost = async (): Promise<Post> => {
  try {
    const response = await axiosInstance.post<Post>(URL);
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const postService = { getFeedPosts, createPost };

export default postService;
