import { Prompt } from '@/models/prompt';
import Link from 'next/link';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: string;
  post: Prompt;
  setPost: (post: Prompt) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            name="prompt"
            placeholder="Write your prompt here..."
            value={post.prompt}
            required
            onChange={e => setPost({ ...post, prompt: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{' '}
            <span className="font-normal">
              (#product, #web-development, #idea, etc.)
            </span>
          </span>
          <input
            className="form_input"
            name="tag"
            placeholder="#tag"
            value={post.tag}
            required
            onChange={e => setPost({ ...post, tag: e.target.value })}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            className="text-gray-500 text-sm"
            href="/"
          >
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
            type="submit"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
