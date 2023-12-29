import { posts } from "./sample";
import "./style.scss";
import Post from "./Post";

function Posts() {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
