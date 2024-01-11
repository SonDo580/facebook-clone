type Props = {
  profilePicture?: string;
  alt?: string;
  className?: string;
};

const defaultProfilePicture = "/samples/profiles/doraemon.png";

function ProfileImg({ profilePicture, alt, className }: Props) {
  const imgSrc = profilePicture || defaultProfilePicture;
  return <img src={imgSrc} alt={alt} className={className} />;
}

export default ProfileImg;
