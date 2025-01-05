'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AuthProviders = () => {
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
  );
};

export default AuthProviders;
