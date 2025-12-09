import { NAV_LINKS } from '@features/layout/model';
import NavLink from '@entities/header/NavLink';

const NavBar = ({
  orientation = 'horizontal',
  onNavigate,
}: {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <nav aria-label="Main navigation">
      <ul
        className={
          isVertical
            ? 'flex flex-col gap-4 px-4 text-sm'
            : 'flex items-center gap-3 text-sm font-medium'
        }
      >
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <NavLink href={href} label={label} onClick={onNavigate} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
