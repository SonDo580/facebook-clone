import { useSelector } from "react-redux";

import { Post as PostType } from "@/types/post";
import { postSliceSelector } from "@/redux/selectors";

import "./style.scss";
import Post from "./Post";
import Skeleton from "@/common/Skeleton";

type Props = {
  posts: PostType[];
};

function Posts({ posts }: Props) {
  const { loading, errorMsg } = useSelector(postSliceSelector);

  if (loading) {
    return <Skeleton count={10} />;
  }

  if (errorMsg) {
    return <h1>{errorMsg}</h1>;
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
