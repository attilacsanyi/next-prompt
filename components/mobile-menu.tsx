'use client';

import Avatar from '@/components/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = ({ avatarUrl }: { avatarUrl?: string }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = async () => {
    setToggleDropdown(false);
    // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl-1
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Avatar
        avatarUrl={avatarUrl}
        imageDescription="menu"
        onClick={() => setToggleDropdown(prev => !prev)}
      />
      {toggleDropdown && (
        <div className="dropdown">
          <Link
            className="dropdown_link"
            href="/profile"
            onClick={() => setToggleDropdown(false)}
          >
            My Profile
          </Link>
          <Link
            className="dropdown_link"
            href="/create-prompt"
            onClick={() => setToggleDropdown(false)}
          >
            Create Prompt
          </Link>
          <button
            className="black_btn mt-5 w-full"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
