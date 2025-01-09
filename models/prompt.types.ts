import { UserDto } from '@/models/user.types';
import { z } from 'zod';

export type PromptDto = {
  id: string;
  prompt: string;
  tag: string;
  creator: UserDto;
};

export type CreatePrompt = {
  prompt: string;
  tag: string;
};

export const CreatePromptFormSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: 'Prompt must be at least 10 characters' }),
  tag: z.string().min(2, { message: 'Tag must be at least 2 characters' }),
});

export type CreatePromptForm = z.infer<typeof CreatePromptFormSchema>;

export type CreatePromptFormState = {
  errors?: { [key in keyof CreatePromptForm]?: string[] } & {
    error?: string;
  };
  values: CreatePromptForm;
};
