'use client';

import Image from 'next/image';
import { useState } from 'react';

const CopyButton = ({
  imageDescription,
  textToCopy,
}: {
  imageDescription: string;
  textToCopy: string;
}) => {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(textToCopy);

    setTimeout(() => {
      setCopied('');
    }, 1000);
  };

  return (
    <div
      className="copy_btn"
      onClick={handleCopy}
    >
      <Image
        alt={imageDescription}
        height={12}
        src={
          copied === textToCopy
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
        }
        width={12}
      />
    </div>
  );
};

export default CopyButton;
