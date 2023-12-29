import "./style.scss";
import CreatePost from "../CreatePost";
import Posts from "../Posts";

function Feed() {
  return (
    <section className="feed">
      <CreatePost />
      <Posts />
    </section>
  );
}

export default Feed;
