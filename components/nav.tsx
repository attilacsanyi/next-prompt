'use client';

import MobileMenu from '@/components/mobile-menu';
import { getProviders, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = () => {
  const isUserLoggedIn = true;

  const [authProviders, setAuthProviders] = useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setAuthProviders(response);
    };
    setProviders();
  }, []);

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

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex-center gap-3 md:gap-5">
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
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map(provider => (
                <button
                  key={provider.name}
                  className="black_btn"
                  type="button"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <MobileMenu />
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map(provider => (
                <button
                  key={provider.name}
                  className="black_btn"
                  type="button"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
