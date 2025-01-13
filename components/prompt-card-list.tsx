import PromptCard from '@/components/prompt-card';
import { PromptDto } from '@/models/prompt.types';

const PromptCardList = async ({
  prompts,
  editMode = false,
}: {
  prompts: PromptDto[];
  editMode?: boolean;
}) => {
  return (
    <div className="prompt_layout">
      {prompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          editMode={editMode}
          prompt={prompt}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
