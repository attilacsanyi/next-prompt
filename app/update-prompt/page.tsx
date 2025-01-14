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

  const promptId = (await searchParams).id;

  const promptToUpdate = await getPrompt(promptId);

  if (!promptToUpdate) {
    notFound();
  }

  const { prompt, tag } = promptToUpdate;

  return <Form values={{ prompt, tag, id: promptId }} />;
};

export default UpdatePromptPage;
