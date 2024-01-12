import { useSelector } from "react-redux";

import { Post as PostType } from "@/types/post";
import { postSliceSelector } from "@/redux/selectors";

import Skeleton from "@/common/Skeleton";
import Post from "../Post";
import "./style.scss";

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

  if (posts.length === 0) {
    return (
      <p>
        No posts to show.
        <br />
        Make friends and follow people to see their posts.
        <br />
        Or create your own posts.
      </p>
    );
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
