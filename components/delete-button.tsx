'use client';

import { deletePromptAction } from '@/actions/prompt-actions';
import { useActionState } from 'react';

const DeleteButton = ({ id }: { id: string }) => {
  // TODO: Confirm deletion before server action
  const [, formAction, pending] = useActionState(
    deletePromptAction.bind(null, id),
    { error: '' }
  );
  return (
    <form action={formAction}>
      <button
        className="orange_gradient font-inter cursor-pointer text-sm"
        type="submit"
      >
        Delete {pending ? '...' : ''}
      </button>
    </form>
  );
};

export default DeleteButton;
