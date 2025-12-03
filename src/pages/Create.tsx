'use client';

import Link from 'next/link';

import { useAuth } from '@features/auth/model';
import CreatePostForm from '@features/posts/ui/CreatePostForm';

const CreatePost = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="container flex min-h-[60vh] items-center justify-center">
        <div className="border-border bg-background-secondary mx-auto max-w-md rounded-xl border p-6 text-center shadow-sm">
          <h1 className="text-foreground mb-2 text-xl font-semibold">
            Sign in required
          </h1>
          <p className="text-foreground/70 mb-4 text-sm">
            You need to be logged in to create a new post.
          </p>
          <Link
            href="/login"
            className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium transition"
          >
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <CreatePostForm />
    </section>
  );
};

export default CreatePost;
