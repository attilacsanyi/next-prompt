'use client';

const Tag = ({
  tag,
  handleTagClick,
}: {
  tag: string;
  handleTagClick?: (tag: string) => void;
}) => {
  return (
    <p
      className="font-inter blue_gradient cursor-pointer text-sm"
      onClick={() => handleTagClick?.(tag)}
    >
      {tag}
    </p>
  );
};

export default Tag;
