import React from 'react';

interface CategorySelectorProps {
  category: string;
  checked: boolean;
  onChange: () => void;
}

export const CategorySelector = ({
  category,
  checked,
  onChange,
}: CategorySelectorProps) => {
  return (
    <label
      className={`cursor-pointer px-4 py-1.5 text-sm font-medium rounded-full border transition-colors select-none ${checked ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'}`}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      {category}
    </label>
  );
};
