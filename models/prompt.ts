'server-only';

import { IUser } from '@/models/user';
import { model, Model, models, Schema } from 'mongoose';

export type IPrompt = {
  _id: string;
  prompt: string;
  tag: string;
  creator: IUser;
};

const PromptSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  prompt: { type: String, required: [true, 'Prompt is required'] },
  tag: { type: String, required: [true, 'Tag is required'] },
});

const Prompt =
  (models.Prompt as Model<IPrompt>) || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
