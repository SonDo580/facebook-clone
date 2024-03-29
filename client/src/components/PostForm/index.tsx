import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

import { Post } from "@/types/post";
import { authSelector, postSliceSelector } from "@/redux/selectors";
import { createPostInit, updatePostInit } from "@/redux/post/postSlice";
import ProfileImg from "@/common/ProfileImg";
import { registerOptions } from "./validation";
import "./style.scss";

type Props = {
  initialData?: Partial<Post>;
  afterSubmit: () => void;
};

type FormFields = {
  content: string;
};

function PostForm({ initialData, afterSubmit }: Props) {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { postLoading, postErrorMsg } = useSelector(postSliceSelector);

  const { firstName, fullName, profilePicture } = user!;
  const editing = !!initialData;
  const { _id: postId = "", content = "" } = initialData || {};
  const defaultValues = {
    content,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues,
  });

  const [submitted, setSummitted] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (editing) {
      dispatch(updatePostInit({ postId, data }));
    } else {
      dispatch(createPostInit(data));
    }
    setSummitted(true);
  };

  useEffect(() => {
    if (!submitted || postLoading) {
      return;
    }

    if (postErrorMsg) {
      setSummitted(false);
    } else {
      afterSubmit();
    }
  }, [submitted, postLoading, postErrorMsg, afterSubmit]);

  return (
    <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="top">
        <ProfileImg profilePicture={profilePicture} alt="profile" />
        <div>
          <span className="name">{fullName}</span>
          <button className="audience todo">
            <span>Post Audience</span>
            <FaCaretDown />
          </button>
        </div>
      </div>

      <textarea
        className="postContent"
        placeholder={`What's on your mind, ${firstName}?`}
        {...register("content", registerOptions.content)}
      />

      {errors.content && <p className="error">{errors.content.message}</p>}
      {postErrorMsg && <p className="error">{postErrorMsg}</p>}

      <ul className="items todo">
        <li>
          <img src="/createPost/photo.png" alt="photo icon" />
        </li>
        <li>
          <img src="/createPost/people.png" alt="people icon" />
        </li>
        <li>
          <img src="/createPost/feeling.png" alt="feeling icon" />
        </li>
        <li>
          <img src="/createPost/checkin.png" alt="location icon" />
        </li>
        <li>
          <img src="/createPost/gif.png" alt="gif icon" />
        </li>
        <li>
          <img src="/createPost/live.png" alt="live icon" />
        </li>
        <li>
          <img src="/createPost/event.png" alt="event icon" />
        </li>
      </ul>

      <button className="submit">Post</button>
    </form>
  );
}

export default PostForm;
