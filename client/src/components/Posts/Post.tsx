import { useState } from "react";

import { SlLike } from "react-icons/sl";
import { FaComment, FaRegComment, FaShare } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

import { Reaction } from "@/constants";
import { getTimeAgo } from "@/utils/datetime";

type Author = {
  firstName: string;
  lastName: string;
  profile: string;
};

type PostType = {
  _id: string;
  author: Author;
  updatedAt: Date;
  content: string;
};

type Props = {
  post: PostType;
};

function Post({ post }: Props) {
  const { author, content, updatedAt } = post;
  const { lastName, firstName, profile } = author;

  const [expanded, setExpanded] = useState(false);
  const toggleContent = () => {
    setExpanded((expanded) => !expanded);
  };

  const reactToPost = (reaction: Reaction) => {
    console.log(reaction);
  };

  return (
    <div className="post">
      <div className="info">
        <img src={profile} alt="profile picture" />
        <div className="text">
          <span className="name">
            {firstName} {lastName}
          </span>
          <span className="time">
            {getTimeAgo(Date.now() - updatedAt.getTime())}
          </span>
        </div>
      </div>

      <p className="content">
        {expanded ? content : `${content.slice(0, 1000)}...`}

        <button onClick={toggleContent} className="contentControl">
          {expanded ? "See less" : "See more"}
        </button>
      </p>

      <div className="images"></div>

      <div className="statistics">
        <div className="react">
          <ul className="reacts">
            <li>
              <img src="/reactions/like.svg" alt="like" />
            </li>
            <li>
              <img src="/reactions/love.svg" alt="love" />
            </li>
          </ul>
          <span className="count">100</span>
        </div>

        <div className="comment todo">
          <FaComment />
          <span className="count">15</span>
        </div>

        <div className="share todo">
          <FaShare />
          <span className="count">5</span>
        </div>
      </div>

      <ul className="interact">
        <li className="react">
          <SlLike />
          <span>Like</span>

          <ul className="reacts">
            {(Object.keys(Reaction) as Reaction[]).map((reaction) => (
              <li key={reaction} onClick={() => reactToPost(reaction)}>
                <img src={`/reactions/${reaction}.gif`} alt={reaction} />
              </li>
            ))}
          </ul>
        </li>
        <li className="todo">
          <FaRegComment />
          <span>Comment</span>
        </li>
        <li className="todo">
          <PiShareFat />
          <span>Share</span>
        </li>
      </ul>
    </div>
  );
}

export default Post;
