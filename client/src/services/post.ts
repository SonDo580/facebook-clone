import { handleServiceError } from "@/utils/error";
import { Post, PostFormData } from "@/types/post";
import { Reaction } from "@/constants";
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

const createPost = async (createPostData: PostFormData): Promise<Post> => {
  try {
    const response = await axiosInstance.post<Post>(URL, createPostData);
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

type ReactToPostReturnType = {
  message: string;
};

const reactToPost = async (
  postId: string,
  reaction: Reaction | null
): Promise<ReactToPostReturnType> => {
  try {
    const response = await axiosInstance.put<ReactToPostReturnType>(
      `${URL}/${postId}/reacts`,
      { reaction }
    );
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const postService = { getFeedPosts, createPost, reactToPost };

export default postService;
