'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEventHandler } from 'react';

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'inline-flex items-center border-b-2 px-1 pb-1 text-sm font-medium tracking-wide transition',
        isActive
          ? 'border-current'
          : 'border-transparent hover:border-current/70',
      ].join(' ')}
    >
      {label}
    </Link>
  );
};

export default NavLink;
