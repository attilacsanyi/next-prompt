'use client';

import Image from 'next/image';

const Avatar = ({
  imageDescription,
  avatarUrl = '/assets/images/logo.svg',
  size = 37,
  onClick = () => {},
}: {
  imageDescription: string;
  avatarUrl?: string;
  size?: number;
  onClick?: () => void;
}) => {
  return (
    <Image
      alt={imageDescription}
      className={`rounded-full ${!!onClick ? 'cursor-pointer' : ''}`}
      height={size}
      src={avatarUrl}
      width={size}
      onClick={onClick}
    />
  );
};

export default Avatar;
