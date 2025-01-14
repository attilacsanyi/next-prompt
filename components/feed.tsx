import PromptCardList from '@/components/prompt-card-list';
import PromptSearch from '@/components/prompt-search';
import { getPrompts } from '@/utils/prompt-dal';

const Feed = async () => {
  const prompts = await getPrompts();
  return (
    <section className="feed">
      <PromptSearch />
      <div className="mt-16">
        <PromptCardList prompts={prompts} />
      </div>
    </section>
  );
};

export default Feed;
