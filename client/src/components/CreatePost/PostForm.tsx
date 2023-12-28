import { FaCaretDown } from "react-icons/fa";

type Props = {
  afterSubmit: () => void;
};

function PostForm({ afterSubmit }: Props) {
  return (
    <form className="postForm">
      <div className="top">
        <img src="/samples/profiles/doraemon.png" alt="profile picture" />
        <div>
          <span className="name">Mon the Mighty Cat</span>
          <button className="audience todo">
            <span>Post Audience</span>
            <FaCaretDown />
          </button>
        </div>
      </div>

      <textarea className="postContent"></textarea>

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
