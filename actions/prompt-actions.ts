'use server';

import Prompt from '@/models/prompt';
import {
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
  const validatedFields = CreatePromptFormSchema.safeParse({
    prompt: formData.get('prompt'),
    tag: formData.get('tag'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  const { prompt, tag } = validatedFields.data;
  const creator = session.user.id;

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator,
      prompt,
      tag,
    });

    await newPrompt.save();
  } catch (error) {
    const errorMessage = 'Failed to create a new prompt';
    console.error(errorMessage, error);
    return {
      errors: {
        error: errorMessage,
      },
    };
  }
  // Alternative is to use useRouter() in the client component and here only return the state with status
  redirect('/');
};
