'use client';

import { useRouter } from 'next/navigation';

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/update-prompt?id=${id}`);
  };
  return (
    <p
      className="green_gradient cursor-pointer font-inter text-sm"
      onClick={handleEdit}
    >
      Edit
    </p>
  );
};

export default EditButton;
