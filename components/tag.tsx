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
      className="blue_gradient cursor-pointer font-inter text-sm"
      onClick={() => handleTagClick?.(tag)}
    >
      {tag}
    </p>
  );
};

export default Tag;
