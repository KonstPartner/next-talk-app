import { Globe, MessageSquareMore, Sparkles } from 'lucide-react';

import RandomPost from '@features/posts/ui/RandomPost';
import { NavigationMap } from '@entities/layout';

const Home = () => {
  return (
    <section className="container">
      <div className="flex flex-col items-center gap-3">
        <div className="text-primary/80 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase">
          <Sparkles className="h-4 w-4" />
          <span>NextTalk</span>
        </div>

        <h1 className="text-foreground text-3xl font-bold md:text-4xl">
          Welcome to NextTalk
        </h1>

        <p className="text-foreground/70 max-w-2xl text-sm md:text-base">
          Read, discuss and share ideas with people from all around the world.
        </p>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="text-foreground/80 flex items-center gap-2">
            <MessageSquareMore className="text-primary h-5 w-5" />
            <span>Meaningful discussions</span>
          </div>

          <div className="text-foreground/80 flex items-center gap-2">
            <Globe className="text-primary h-5 w-5" />
            <span>Global community</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <RandomPost />
      </div>

      <NavigationMap />
    </section>
  );
};

export default Home;
