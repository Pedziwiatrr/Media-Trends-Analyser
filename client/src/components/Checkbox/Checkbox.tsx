import type { ComponentProps } from 'react';

type CheckboxProps = ComponentProps<'input'>;

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center text-gray-300 ${className}`}>
      <input
        type="checkbox"
        className="form-checkbox h-6 w-6 text-blue-600 bg-gray-700 border-gray-600 rounded"
        {...props}
      />
      <span className="ml-2 text-lg">{children}</span>
    </label>
  );
}
