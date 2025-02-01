'use client';

import { upsertPromptAction } from '@/actions/prompt-actions';
import Link from 'next/link';
import { useActionState } from 'react';

const Form = ({
  values,
}: {
  values?: { prompt: string; tag: string; id: string };
}) => {
  const mode = values ? 'Update' : 'Create';
  // Only defined in update mode
  const promptId = values?.id;

  const [
    {
      errors,
      values: { prompt, tag },
    },
    formAction,
    pending,
  ] = useActionState(upsertPromptAction.bind(null, promptId), {
    values: values ?? { prompt: '', tag: '' },
  });

  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{mode} Prompt</span>
      </h1>
      <p className="desc max-w-md text-left">
        {mode} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        action={formAction}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            defaultValue={prompt}
            name="prompt"
            placeholder="Write your prompt here..."
            required
          />
          {errors?.prompt && (
            <p className="mt-2 text-sm text-red-500">
              {errors.prompt.join(', ')}
            </p>
          )}
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag{' '}
            <span className="font-normal">
              (#product, #web-development, #idea, etc.)
            </span>
          </span>
          <input
            className="form_input"
            defaultValue={tag}
            name="tag"
            placeholder="#tag"
            required
          />
          {errors?.tag && (
            <p className="mt-2 text-sm text-red-500">{errors.tag.join(', ')}</p>
          )}
        </label>
        {errors?.error && (
          <p className="mt-2 text-sm text-red-500">{errors.error}</p>
        )}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            className="text-sm text-gray-500"
            href={mode === 'Update' ? '/profile' : '/'}
          >
            Cancel
          </Link>
          <button
            className="bg-primary-orange rounded-full px-5 py-1.5 text-sm text-white"
            disabled={pending}
            type="submit"
          >
            {pending ? `${mode}...` : mode}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
