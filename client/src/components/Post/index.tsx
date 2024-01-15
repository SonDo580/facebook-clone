import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SlLike } from "react-icons/sl";
import { FaComment, FaRegComment, FaShare } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import { Post as PostType } from "@/types/post";
import { Reaction } from "@/constants";
import { getTimeAgo } from "@/utils/datetime";
import { getReactionStatistics } from "@/utils/reaction";
import { deletePostInit, resetPostError } from "@/redux/post/postSlice";
import { authSelector, postSliceSelector } from "@/redux/selectors";

import ProfileImg from "@/common/ProfileImg";
import Modal from "@/common/Modal";
import PostForm from "../PostForm";
import "./style.scss";

type Props = {
  post: PostType;
};

function Post({ post }: Props) {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { postErrorMsg } = useSelector(postSliceSelector);
  const { _id: postId, author, content, updatedAt, images, reactions } = post;
  const { lastName, firstName, profilePicture } = author;

  const shortenedContent = content.slice(0, 1000);
  const showContentControl = shortenedContent.length < content.length;

  const { total: totalReactions, topReactions } =
    getReactionStatistics(reactions);

  const renderedImages = images.slice(0, 3);
  const remainedImagesLength = images.length - renderedImages.length;

  const [expanded, setExpanded] = useState(false);
  const toggleContent = () => {
    setExpanded((expanded) => !expanded);
  };

  const isAuthor = author._id === user!._id;
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible((visible) => !visible);
  };

  const [editFormVisible, setEditFormVisible] = useState(false);
  const showEditForm = () => {
    setEditFormVisible(true);
  };
  const hideEditForm = () => {
    setEditFormVisible(false);
  };

  const [deleting, setDeleting] = useState(false);
  const deletePost = () => {
    dispatch(deletePostInit(postId));
    setDeleting(true);
  };

  useEffect(() => {
    if (deleting && postErrorMsg) {
      toast.error(postErrorMsg);
      setDeleting(false);
      dispatch(resetPostError());
    }
  }, [dispatch, deleting, postErrorMsg]);

  const reactToPost = (reaction: Reaction | null) => {
    console.log(reaction);
  };

  return (
    <>
      <div className="post">
        <div className="info">
          <ProfileImg profilePicture={profilePicture} alt="profile" />
          <div className="text">
            <span className="name">
              {firstName} {lastName}
            </span>
            <span className="time">
              {getTimeAgo(Date.now() - Date.parse(updatedAt))}
            </span>
          </div>
        </div>

        <p className="content">
          {expanded ? content : shortenedContent}

          {showContentControl && (
            <>
              <span>...</span>
              <button onClick={toggleContent} className="contentControl">
                {expanded ? "See less" : "See more"}
              </button>
            </>
          )}
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
          <div className="react">
            {totalReactions && (
              <>
                <ul className="reacts">
                  {topReactions.map((reaction) => (
                    <li key={reaction}>
                      <img src={`/reactions/${reaction}.svg`} alt={reaction} />
                    </li>
                  ))}
                </ul>
                <span className="count">{totalReactions}</span>
              </>
            )}
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
          <li className="react" onClick={() => reactToPost(null)}>
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

        {isAuthor && (
          <div className="menu">
            <button onClick={toggleMenu}>
              <BsThreeDots />
            </button>
            <button className="todo">
              <MdClose />
            </button>

            {menuVisible && (
              <ul className="options" onClick={toggleMenu}>
                <li onClick={showEditForm}>
                  <AiOutlineEdit />
                  <span>Edit Post</span>
                </li>
                <li onClick={deletePost}>
                  <BsTrash />
                  <span>Delete Post</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {editFormVisible && (
        <Modal title="Edit post" onCancel={hideEditForm}>
          <PostForm afterSubmit={hideEditForm} initialData={post} />
        </Modal>
      )}
    </>
  );
}

export default Post;
