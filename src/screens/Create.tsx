'use client';

import { useAuth } from '@features/auth/model';
import { CreatePostForm } from '@features/posts/ui';
import { AuthRedirectSection } from '@entities/auth';

const CreatePost = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="container">
        <AuthRedirectSection message="create a new post" />
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
