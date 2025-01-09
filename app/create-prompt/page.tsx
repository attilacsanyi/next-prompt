import Form from '@/components/form';
import { auth } from '@/utils/auth';
import { unauthorized } from 'next/navigation';

const CreatePromptPage = async () => {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  return <Form type="Create" />;
};

export default CreatePromptPage;
