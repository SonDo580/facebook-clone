import { useState } from "react";

import { SlLike } from "react-icons/sl";
import { FaComment, FaRegComment, FaShare } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

import { Post as PostType } from "@/types/post";
import { Reaction } from "@/constants";
import { getTimeAgo } from "@/utils/datetime";
import { getReactionStatistics } from "@/utils/utils";

type Props = {
  post: PostType;
};

function Post({ post }: Props) {
  const { author, content, updatedAt, images, reactions } = post;
  const { lastName, firstName, profilePicture } = author;

  const { total: totalReactions, topReactions } =
    getReactionStatistics(reactions);

  const renderedImages = images.slice(0, 3);
  const remainedImagesLength = images.length - renderedImages.length;

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
        <img src={profilePicture} alt="profile picture" />
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

      <ul className="images">
        {renderedImages.map((path, index) => (
          <li key={index}>
            <img src={path} alt="post image" />

            {index === renderedImages.length - 1 &&
              remainedImagesLength > 0 && (
                <div className="more">
                  <span>+ {remainedImagesLength}</span>
                </div>
              )}
          </li>
        ))}
      </ul>

      <div className="statistics">
        {totalReactions && (
          <div className="react">
            <ul className="reacts">
              {topReactions.map((reaction) => (
                <li>
                  <img src={`/reactions/${reaction}.svg`} alt={reaction} />
                </li>
              ))}
            </ul>
            <span className="count">{totalReactions}</span>
          </div>
        )}

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
                <img src={`/reactions/${reaction}.svg`} alt={reaction} />
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
