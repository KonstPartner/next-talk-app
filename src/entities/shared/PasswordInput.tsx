'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium" htmlFor={id}>
            {label}
          </label>
        )}

        <div className="border-border bg-background flex items-center gap-2 rounded-md border px-2 py-1">
          <input
            ref={ref}
            id={id}
            placeholder={label}
            type={visible ? 'text' : 'password'}
            className={`text-foreground w-full bg-transparent text-sm outline-none ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-icon hover:text-foreground cursor-pointer p-1"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
