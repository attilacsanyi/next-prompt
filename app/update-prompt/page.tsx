import Form from '@/components/form';
import { auth } from '@/utils/auth';
import { unauthorized } from 'next/navigation';

const UpdatePromptPage = async () => {
  const session = await auth();
  // TODO: handle authentication in one place (middleware?)
  if (!session?.user) {
    unauthorized();
  }

  return <Form type="Update" />;
};

export default UpdatePromptPage;
