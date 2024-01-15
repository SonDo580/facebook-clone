import { handleServiceError } from "@/utils/error";
import { Post, PostFormData, UpdatePostPayload } from "@/types/post";
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

const updatePost = async (
  updatePostPayload: UpdatePostPayload
): Promise<Post> => {
  try {
    const { postId, data: updatePostData } = updatePostPayload;
    const response = await axiosInstance.put<Post>(
      `${URL}/${postId}`,
      updatePostData
    );
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

const postService = { getFeedPosts, createPost, updatePost, reactToPost };

export default postService;
