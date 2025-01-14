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
  creator: string;
};

export type UpdatePrompt = {
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

/** Form state model derived from its form schema */
export const CreatePromptFormStateSchema = z.object({
  errors: z
    .object({
      prompt: z.union([z.array(z.string()), z.undefined()]).optional(),
      tag: z.union([z.array(z.string()), z.undefined()]).optional(),
      /** Other not field relevant error message */
      error: z.string().optional(),
    })
    .optional(),
  /** Preserved user input values */
  values: z.object({
    prompt: z.string(),
    tag: z.string(),
  }),
});

export type CreatePromptFormState = z.infer<typeof CreatePromptFormStateSchema>;
