import Link from 'next/link';

import { useAuth } from '@features/auth/model';
import { Button } from '@entities/shared';

const AuthButton = () => {
  const { user, logout, isHydrated } = useAuth();

  if (!isHydrated) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="text-muted-foreground w-8 truncate text-xs lg:w-15"
          title={user.username}
        >
          {user.username}
        </span>
        <Button className="cursor-pointer" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  );
};

export default AuthButton;
