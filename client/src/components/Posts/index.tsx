import { useSelector } from "react-redux";

import { Post as PostType } from "@/types/post";
import { postSliceSelector } from "@/redux/selectors";

import "./style.scss";
import Post from "./Post";

type Props = {
  posts: PostType[];
};

function Posts({ posts }: Props) {
  const { loading, errorMsg } = useSelector(postSliceSelector);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
