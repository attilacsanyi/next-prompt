'use client';

import { deletePromptAction } from '@/actions/prompt-actions';
import { useActionState } from 'react';

const DeleteButton = ({ id }: { id: string }) => {
  const [, formAction, pending] = useActionState(
    deletePromptAction.bind(null, id, {})
  );
  return (
    <form action={formAction}>
      <button
        className="orange_gradient cursor-pointer font-inter text-sm"
        type="submit"
      >
        Delete {pending ? '...' : ''}
      </button>
    </form>
  );
};

export default DeleteButton;
