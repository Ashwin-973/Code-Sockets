import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const SelectNew = ({ 
options,
  placeholder = "Select an option",
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(()=>
    {
      setSelectedOption(value)
    },[value])

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);  //what does this line do?
  };

  return (
    <div className="relative w-[200px] max-w-3xs" ref={selectRef}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-lg blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-75" />
        <button
        type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full flex items-center justify-between h-14 px-4 rounded-lg border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:border-gray-300 group-hover:bg-white/90"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`block truncate ${selectedOption ? 'text-gray-800' : 'text-gray-500'}`}>
            {selectedOption || placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-1 backdrop-blur-xl bg-white/90">
          <ul
            className="max-h-40 overflow-auto"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer transition-colors duration-150
                  ${selectedOption === option 
                    ? 'bg-violet-50 text-violet-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
                role="option"
                aria-selected={selectedOption=== option}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

