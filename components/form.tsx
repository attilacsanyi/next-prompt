'use client';

import { createPrompt } from '@/actions/prompt-actions';
import Link from 'next/link';
import { useActionState } from 'react';

const Form = ({ type }: { type: string }) => {
  const [state, formAction, pending] = useActionState(createPrompt, undefined);

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
        action={formAction}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            name="prompt"
            placeholder="Write your prompt here..."
            required
          />
          {state?.errors?.prompt && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.prompt.join(', ')}
            </p>
          )}
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
            required
          />
          {state?.errors?.tag && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.tag.join(', ')}
            </p>
          )}
        </label>
        {state?.errors?.error && (
          <p className="mt-2 text-sm text-red-500">{state.errors.error}</p>
        )}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            className="text-gray-500 text-sm"
            href="/"
          >
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={pending}
            type="submit"
          >
            {pending ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
