import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  placeholder = "Search anything...",
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch?.('');
  };

  return (
    <div className="relative w-5/6 max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-lg blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-75" />
        <div className="relative flex items-center h-14 w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:border-gray-300 group-hover:bg-white/90">
          <Search className="w-5 h-5 text-gray-500 ml-4" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-4 text-gray-800 placeholder-gray-500 outline-none"
            aria-label="Search input"
          />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="p-2 mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export {SearchBar};