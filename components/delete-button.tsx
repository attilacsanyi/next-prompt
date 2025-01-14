'use client';

const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = () => {
    // TODO: delete prompt by id
  };
  return (
    <p
      className="orange_gradient cursor-pointer font-inter text-sm"
      onClick={handleDelete}
    >
      Delete
    </p>
  );
};

export default DeleteButton;
