import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border-border bg-background text-foreground focus:border-primary focus:ring-primary/50 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
