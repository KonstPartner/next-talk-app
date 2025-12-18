import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <section className="container flex items-center justify-center">
      <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-2xl">
        <AlertTriangle className="h-12 w-12" />
      </div>

      <div>
        <h1 className="text-foreground mb-2 text-center text-3xl leading-tight font-bold">
          Page not found
        </h1>
        <p className="text-foreground/70 max-w-md text-sm">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
