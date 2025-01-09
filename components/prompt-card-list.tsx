import PromptCard from '@/components/prompt-card';
import { PromptDto } from '@/models/prompt.types';

const PromptCardList = ({ prompts }: { prompts: PromptDto[] }) => {
  return (
    <div className="prompt_layout mt-16">
      {prompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
