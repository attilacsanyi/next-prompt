'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <>
      <Image
        alt="menu"
        className="invert-white"
        height={37}
        src="/assets/images/logo.svg"
        width={37}
        onClick={() => {
          setToggleDropdown(prev => !prev);
        }}
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
            className="mt-5 w-full black_btn"
            type="button"
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
