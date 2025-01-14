import Profile from '@/components/profile';
import { auth } from '@/utils/auth';
import { getPromptsByUserId } from '@/utils/prompt-dal';
import { unauthorized } from 'next/navigation';

const ProfilePage = async () => {
  const session = await auth();
  // TODO: handle authentication in one place (middleware?)
  if (!session?.user) {
    unauthorized();
  }

  const userPrompts = await getPromptsByUserId(session.user.id);

  return (
    <Profile
      editMode={true}
      name="My"
      prompts={userPrompts}
      title="Welcome to your personalized profile page"
    />
  );
};

export default ProfilePage;
