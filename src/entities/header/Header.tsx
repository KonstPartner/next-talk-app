'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { ToggleTheme } from '@features/theme/ui';
import Logo from '@entities/header/Logo';
import NavBar from '@entities/header/NavBar';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="border-border sticky z-40 container border-b">
      <div className="flex items-center justify-between py-4">
        <Logo />

        <div className="hidden items-center gap-4 md:flex">
          <NavBar />
          <ToggleTheme />
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((v) => !v)}
          className="border-border bg-background-secondary text-foreground hover:bg-muted inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition md:hidden"
        >
          <Menu className="text-icon h-5 w-5" />
        </button>
      </div>

      {isMobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main navigation"
          className="bg-background/95 flex flex-col items-center border-t md:hidden"
        >
          <div className="flex items-center justify-between px-4 py-2">
            <ToggleTheme />
          </div>
          <NavBar
            orientation="vertical"
            onNavigate={() => setIsMobileOpen(false)}
          />
        </nav>
      )}
    </header>
  );
};

export default Header;
