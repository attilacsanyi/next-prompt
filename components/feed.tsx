import { getPrompts } from '@/actions/prompt-actions';
import PromptCardList from '@/components/prompt-card-list';
import PromptSearch from '@/components/prompt-search';

const Feed = async () => {
  const prompts = await getPrompts();
  return (
    <section className="feed">
      <PromptSearch />
      <PromptCardList prompts={prompts} />
    </section>
  );
};

export default Feed;
