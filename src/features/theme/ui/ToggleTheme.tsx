'use client';

import { Monitor, Moon, Sun } from 'lucide-react';

import { useToggleTheme } from '@features/theme/model';

const ToggleTheme = () => {
  const { handleThemeChange, buttonClasses } = useToggleTheme();

  return (
    <div className="border-border bg-background-secondary flex items-center gap-2 rounded-full border px-2 py-1 shadow-sm">
      <button
        onClick={() => handleThemeChange('light')}
        className={buttonClasses('light')}
        aria-label="Use light theme"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        className={buttonClasses('dark')}
        aria-label="Use dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        className={buttonClasses('system')}
        aria-label="Use system theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ToggleTheme;
