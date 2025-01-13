import { IPrompt } from '@/models/prompt';
import { PromptDto } from '@/models/prompt.types';

export const promptDtoFromIPrompt = (prompt: IPrompt): PromptDto => {
  return {
    id: prompt._id.toString(),
    prompt: prompt.prompt,
    tag: prompt.tag,
    creator: {
      id: prompt.creator._id.toString(),
      username: prompt.creator.username,
      email: prompt.creator.email,
      image: prompt.creator.image,
    },
  };
};
