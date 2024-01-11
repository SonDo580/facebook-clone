import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

import { authSelector } from "@/redux/selectors";
import { registerOptions } from "./validation";

type Props = {
  afterSubmit: () => void;
};

type FormFields = {
  content: string;
};

function PostForm({ afterSubmit }: Props) {
  const { user } = useSelector(authSelector);
  const { firstName, lastName, profilePicture } = user!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    afterSubmit();
  };

  return (
    <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="top">
        <img src={profilePicture} alt="profile" />
        <div>
          <span className="name">
            {firstName} {lastName}
          </span>
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
      ></textarea>
      {errors.content && <p className="error">{errors.content.message}</p>}

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
