import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postSliceSelector } from "@/redux/selectors";
import { getFeedPostsInit } from "@/redux/post/postSlice";

import "./style.scss";
import Posts from "../Posts";
import CreatePost from "../CreatePost";

function Feed() {
  const dispatch = useDispatch();
  const { posts } = useSelector(postSliceSelector);

  useEffect(() => {
    dispatch(getFeedPostsInit());
  }, [dispatch]);

  return (
    <section className="feed">
      <CreatePost />
      <Posts posts={posts} />
    </section>
  );
}

export default Feed;
