import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

const Button = ({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent',
    outline:
      'bg-background text-foreground border border-border hover:bg-muted',
  } as const;

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
};

export default Button;
