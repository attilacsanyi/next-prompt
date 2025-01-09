'server-only';

import { model, Model, models, Schema } from 'mongoose';

type IPrompt = {
  prompt: string;
  tag: string;
  creator: string;
};

const PromptSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  prompt: { type: String, required: [true, 'Prompt is required'] },
  tag: { type: String, required: [true, 'Tag is required'] },
});

const Prompt =
  (models.Prompt as Model<IPrompt>) || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
