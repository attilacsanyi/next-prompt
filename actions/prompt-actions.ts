'use server';

import Prompt from '@/models/prompt';
import {
  CreatePromptForm,
  CreatePromptFormSchema,
  CreatePromptFormState,
} from '@/models/prompt.types';
import { auth } from '@/utils/auth';
import { connectToDB } from '@/utils/database';
import { redirect, unauthorized } from 'next/navigation';

export const createPrompt = async (
  prevState: CreatePromptFormState,
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

  const validatedFields = CreatePromptFormSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    };
  }

  const { prompt, tag } = validatedFields.data;
  const creator = session.user.id;

  try {
    await connectToDB();

    const newPrompt = new Prompt({ creator, prompt, tag });

    await newPrompt.save();
  } catch (error) {
    const errorMessage = 'Failed to create a new prompt';
    console.error(errorMessage, error);
    return {
      errors: {
        error: errorMessage,
      },
      values,
    };
  }
  // Alternative would be to  use useRouter() in the client component and here only return the state with status
  redirect('/');
};
