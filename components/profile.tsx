import PromptCardList from '@/components/prompt-card-list';
import { PromptDto } from '@/models/prompt.types';

const Profile = ({
  name,
  prompts,
  title,
  editMode = false,
}: {
  name: string;
  prompts: PromptDto[];
  title: string;
  editMode?: boolean;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{title}</p>
      <div className="mt-10">
        <PromptCardList
          editMode={editMode}
          prompts={prompts}
        />
      </div>
    </section>
  );
};

export default Profile;
