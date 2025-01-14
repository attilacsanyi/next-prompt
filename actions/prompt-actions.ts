'use server';

import {
  CreatePromptForm,
  CreatePromptFormSchema,
  CreatePromptFormState,
} from '@/models/prompt.types';
import { auth } from '@/utils/auth';
import { createPrompt } from '@/utils/prompt-dal';
import { redirect, unauthorized } from 'next/navigation';

export const createPromptAction = async (
  state: CreatePromptFormState,
  formData: FormData
): Promise<CreatePromptFormState> => {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  const values: CreatePromptForm = {
    prompt: formData.get('prompt') as string,
    tag: formData.get('tag') as string,
  };

  const validateForm = CreatePromptFormSchema.safeParse(values);

  if (!validateForm.success) {
    const errors = validateForm.error.flatten().fieldErrors;
    console.error(`Invalid form data: ${JSON.stringify(errors)}`);
    return {
      values,
      errors,
    };
  }

  const { prompt, tag } = validateForm.data;
  const creator = session.user.id;

  const savedPrompt = await createPrompt({ prompt, tag, creator });
  if (!savedPrompt) {
    const errorMessage = 'Failed to create a new prompt';
    console.error(errorMessage);
    return {
      values,
      errors: {
        error: errorMessage,
      },
    };
  }

  // Alternative would be to  use useRouter() in the client component and here only return the state with status
  redirect('/');
};
