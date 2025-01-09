import Form from '@/components/form';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const CreatePromptPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect('/'); // TODO: use the new unauthorized page
  }

  return <Form type="Create" />;
};

export default CreatePromptPage;
