'use server';

import {
  UpsertPromptFormSchema,
  UpsertPromptFormState,
  UpsertPromptFormStateSchema,
} from '@/models/prompt.types';
import { auth } from '@/utils/auth';
import { createPrompt, deletePrompt, updatePrompt } from '@/utils/prompt-dal';
import { revalidatePath } from 'next/cache';
import { redirect, unauthorized } from 'next/navigation';

export const upsertPromptAction = async (
  promptId: string | undefined,
  state: unknown,
  formData: unknown
): Promise<UpsertPromptFormState> => {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  if (!(formData instanceof FormData)) {
    throw new Error('Invalid form data');
  }

  const validatedState = UpsertPromptFormStateSchema.safeParse(state);
  if (!validatedState.success) {
    const errorMessage = `Invalid from state: ${JSON.stringify(
      validatedState.error.flatten().fieldErrors
    )}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const values = {
    prompt: formData.get('prompt') as string,
    tag: formData.get('tag') as string,
  };

  const validateForm = UpsertPromptFormSchema.safeParse(values);

  if (!validateForm.success) {
    const errors = validateForm.error.flatten().fieldErrors;
    console.error(`Invalid form data: ${JSON.stringify(errors)}`);
    return {
      values,
      errors,
    };
  }

  const { prompt, tag } = validateForm.data;

  // Update a new prompt
  if (promptId) {
    const updatedPrompt = await updatePrompt(promptId, { prompt, tag });
    if (!updatedPrompt) {
      const errorMessage = 'Failed to update the prompt';
      console.error(errorMessage);
      return {
        values,
        errors: {
          error: errorMessage,
        },
      };
    }
  } else {
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
  }

  // Alternative would be to  use useRouter() in the client component and here only return the state with status
  redirect('/profile');
};

export const deletePromptAction = async (promptId: string) => {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  const deletedPromptId = await deletePrompt(promptId);
  if (!deletedPromptId) {
    return {
      error: 'Failed to delete the prompt',
    };
  }

  revalidatePath('/profile');
};
