import { MessageSquareMore } from 'lucide-react';
import Link from 'next/link';

const Logo = () => (
  <Link
    href="/"
    aria-label="Go to home page"
    className="flex cursor-pointer items-center gap-3"
  >
    <span className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
      <MessageSquareMore className="h-5 w-5" />
    </span>

    <div className="leading-tight">
      <span className="text-foreground block text-lg font-semibold">
        NextTalk
      </span>
      <span className="text-foreground block text-xs opacity-70">
        Posts & Comments
      </span>
    </div>
  </Link>
);

export default Logo;
