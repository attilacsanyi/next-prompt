'use client';

import { useState } from 'react';
const PromptSearch = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form className="flex-center relative w-full">
      <input
        className="search_input peer"
        placeholder="Search for a tag or a username"
        type="text"
        value={searchText}
        required
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default PromptSearch;
