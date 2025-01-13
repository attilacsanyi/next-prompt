'use client';

import Avatar from '@/components/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const DesktopMenu = ({ avatarUrl }: { avatarUrl?: string }) => {
  const handleSignOut = async () => {
    // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl-1
    await signOut({ callbackUrl: '/' });
  };

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
        onClick={handleSignOut}
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
