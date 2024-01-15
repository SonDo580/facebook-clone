import { handleServiceError } from "@/utils/error";
import {
  DeletePostReturnType,
  Post,
  PostFormData,
  ReactToPostPayload,
  ReactToPostReturnType,
  UpdatePostPayload,
} from "@/types/post";
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

const deletePost = async (postId: string): Promise<DeletePostReturnType> => {
  try {
    const response = await axiosInstance.delete<DeletePostReturnType>(
      `${URL}/${postId}`
    );
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const reactToPost = async (
  reactToPostPayload: ReactToPostPayload
): Promise<Post> => {
  try {
    const { postId, reaction } = reactToPostPayload;
    const response = await axiosInstance.put<Post>(`${URL}/${postId}/reacts`, {
      reaction,
    });
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const postService = {
  getFeedPosts,
  createPost,
  updatePost,
  deletePost,
  reactToPost,
};

export default postService;
