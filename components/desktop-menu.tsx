'use client';

import Avatar from '@/components/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const DesktopMenu = ({ avatarUrl }: { avatarUrl: string }) => {
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
        <Avatar
          avatarUrl={avatarUrl}
          imageDescription="profile"
        />
      </Link>
    </>
  );
};

export default DesktopMenu;
