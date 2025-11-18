import type { ComponentProps } from 'react';

type DateInputProps = ComponentProps<'input'> & {
  label: string;
};

export function DateInput({ id, label, className, ...props }: DateInputProps) {
  return (
    <div className={`flex flex-col w-40 ${className}`}>
      <label htmlFor={id} className="text-lg font-medium text-gray-400 mb-1">
        {label}
      </label>

      <input
        id={id}
        type="date"
        className="p-2 border border-gray-500 rounded-md focus:border-gray-600 focus:ring focus:ring-gray-500 focus:ring-opacity-50 bg-gray-700 text-white"
        {...props}
      />
    </div>
  );
}
