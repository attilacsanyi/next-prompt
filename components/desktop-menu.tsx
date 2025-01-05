import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const DesktopMenu = () => {
  return (
    <>
      <Link
        className="black_btn"
        href="/create-prompt"
      >
        Create Post
      </Link>
      <button
        className="outline_btn"
        type="button"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href="/profile">
        <Image
          alt="profile"
          className="rounded-full"
          height={37}
          src="/assets/images/logo.svg"
          width={37}
        />
      </Link>
    </>
  );
};

export default DesktopMenu;
