'server-only';

import Prompt, { IPrompt } from '@/models/prompt';
import { CreatePrompt, PromptDto, UpdatePrompt } from '@/models/prompt.types';
import { connectToDB } from '@/utils/database';
import { promptDtoFromIPrompt } from '@/utils/prompt-util';

export const getPrompts = async (): Promise<PromptDto[]> => {
  let prompts: PromptDto[] = [];
  try {
    await connectToDB();
    const promptsData: IPrompt[] = await Prompt.find({}).populate('creator');
    prompts = promptsData.map(prompt => promptDtoFromIPrompt(prompt));
  } catch (error) {
    console.error('Failed to fetch prompts', error);
  }
  return prompts;
};

export const getPromptsByUserId = async (
  userId: string
): Promise<PromptDto[]> => {
  let prompts: PromptDto[] = [];
  try {
    await connectToDB();
    const promptsData = await Prompt.find({ creator: userId }).populate(
      'creator'
    );
    prompts = promptsData.map(prompt => promptDtoFromIPrompt(prompt));
  } catch (error) {
    console.error('Failed to fetch prompts by userId', error);
  }
  return prompts;
};

export const getPrompt = async (id: string): Promise<PromptDto | null> => {
  let prompt: PromptDto | null = null;
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id).populate('creator');
    if (existingPrompt) {
      prompt = promptDtoFromIPrompt(existingPrompt);
    }
  } catch (error) {
    console.error(`Failed to fetch prompt by id ${id}`, error);
  }
  return prompt;
};

export const createPrompt = async ({ prompt, tag, creator }: CreatePrompt) => {
  let savedPrompt: PromptDto | null = null;
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator, prompt, tag });
    const createdPrompt = await newPrompt.save();
    savedPrompt = promptDtoFromIPrompt(createdPrompt);
  } catch (error) {
    console.error(
      `Failed to create a new prompt ${prompt} with tag ${tag} and creator ${creator}`,
      error
    );
  }
  return savedPrompt;
};

export const updatePrompt = async (
  id: string,
  { prompt, tag }: UpdatePrompt
): Promise<PromptDto | null> => {
  let updatedPrompt: PromptDto | null = null;
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findByIdAndUpdate(id, {
      prompt,
      tag,
    });
    if (existingPrompt) {
      const savedPrompt = await existingPrompt.save();
      updatedPrompt = promptDtoFromIPrompt(savedPrompt);
    }
  } catch (error) {
    console.error(`Failed to update prompt by id ${id}`, error);
  }
  return updatedPrompt;
};

export const deletePrompt = async (id: string): Promise<void> => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Failed to delete prompt by id ${id}`, error);
  }
};
