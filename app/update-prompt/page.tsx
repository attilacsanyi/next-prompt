import Form from '@/components/form';
import { auth } from '@/utils/auth';
import { getPrompt } from '@/utils/prompt-dal';
import { notFound, unauthorized } from 'next/navigation';

const UpdatePromptPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const session = await auth();
  // TODO: handle authentication in one place (middleware?)
  if (!session?.user) {
    unauthorized();
  }

  const id = (await searchParams).id;

  const promptToUpdate = await getPrompt(id);

  if (!promptToUpdate) {
    notFound();
  }

  const { prompt, tag } = promptToUpdate;

  return (
    <Form
      type="Update"
      values={{ prompt, tag }}
    />
  );
};

export default UpdatePromptPage;
