import Profile from '@/components/profile';
import { auth } from '@/utils/auth';
import { unauthorized } from 'next/navigation';

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  return <Profile />;
};

export default ProfilePage;
