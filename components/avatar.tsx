import Image from 'next/image';

const Avatar = ({
  avatarUrl,
  imageDescription,
  onClick = () => {},
}: {
  avatarUrl: string;
  imageDescription: string;
  onClick?: () => void;
}) => {
  return (
    <Image
      alt={imageDescription}
      className="rounded-full"
      height={37}
      src={avatarUrl}
      width={37}
      onClick={onClick}
    />
  );
};

export default Avatar;
