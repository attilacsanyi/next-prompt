'use server';

import Prompt, { IPrompt } from '@/models/prompt';
import {
  CreatePromptForm,
  CreatePromptFormSchema,
  CreatePromptFormState,
  PromptDto,
} from '@/models/prompt.types';
import { auth } from '@/utils/auth';
import { connectToDB } from '@/utils/database';
import { redirect, unauthorized } from 'next/navigation';

// TODO: move to dal as this is not an action
export const getPrompts = async (): Promise<PromptDto[]> => {
  let prompts: PromptDto[] = [];
  try {
    await connectToDB();
    const promptsData: IPrompt[] = await Prompt.find({}).populate('creator');
    // TODO: define in utils or in dal
    prompts = promptsData.map(prompt => ({
      id: prompt._id.toString(),
      prompt: prompt.prompt,
      tag: prompt.tag,
      creator: {
        id: prompt.creator._id.toString(),
        username: prompt.creator.username,
        email: prompt.creator.email,
        image: prompt.creator.image,
      },
    }));
  } catch (error) {
    console.error('Failed to fetch prompts', error);
  }
  return prompts;
};

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

  // TODO: move this create prompt logic to dal
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
