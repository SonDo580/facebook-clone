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

      <p className="content">{content}</p>
    </div>
  );
}

export default Post;
