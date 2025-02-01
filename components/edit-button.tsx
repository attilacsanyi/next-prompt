'use client';

import { useRouter } from 'next/navigation';

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/update-prompt?id=${id}`);
  };
  return (
    <button
      className="green_gradient font-inter cursor-pointer text-sm"
      onClick={handleEdit}
    >
      Edit
    </button>
  );
};

export default EditButton;
