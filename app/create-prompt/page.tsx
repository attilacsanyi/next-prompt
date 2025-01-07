'use client';

import Form from '@/components/form';
import { Prompt } from '@/models/prompt';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePromptPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Prompt>({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          // TODO: get user id from session
          userId: '677d100d58cfd92bdf48ed17',
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      handleSubmit={createPrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
      type="Create"
    />
  );
};

export default CreatePromptPage;
