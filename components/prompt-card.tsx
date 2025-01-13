import Avatar from '@/components/avatar';
import CopyButton from '@/components/copy-button';
import Tag from '@/components/tag';
import { PromptDto } from '@/models/prompt.types';
import Link from 'next/link';

const PromptCard = async ({
  prompt: { creator, prompt, tag, id },
  editMode,
}: {
  prompt: PromptDto;
  editMode: boolean;
}) => {
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <Link
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          href={`/profile/${creator.username}`}
        >
          <Avatar
            avatarUrl={creator.image}
            imageDescription="User Image"
            size={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-sm font-semibold text-gray-900">
              {creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">{creator.email}</p>
          </div>
        </Link>

        <CopyButton
          imageDescription="Copy Prompt"
          textToCopy={prompt}
        />
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt}</p>
      <Tag tag={tag} />

      {editMode && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p className="green_gradient cursor-pointer font-inter text-sm">
            Edit
          </p>
          <p className="orange_gradient cursor-pointer font-inter text-sm">
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
