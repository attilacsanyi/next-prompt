'use client';

import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <Link
        className="flex-center flex gap-2"
        href="/"
      >
        <Image
          alt="Prompt logo"
          className="object-contain"
          height={30}
          src="/assets/images/logo.svg"
          width={30}
        />
        <p className="logo_text">Next Prompt</p>
      </Link>
    </nav>
  );
};

export default Nav;
