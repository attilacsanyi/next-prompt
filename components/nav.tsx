import AuthProviders from '@/components/auth-providers';
import DesktopMenu from '@/components/desktop-menu';
import MobileMenu from '@/components/mobile-menu';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  const avatarUrl = '/assets/images/logo.svg';

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
            <DesktopMenu avatarUrl={avatarUrl} />
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <MobileMenu avatarUrl={avatarUrl} />
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Nav;
