'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useCreatePost } from '@features/posts/api/hooks';
import { PostFormValues } from '@features/posts/model';
import { PostMutateForm } from '@entities/posts';

const CreatePostForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync, isPending, error } = useCreatePost();

  const handleSubmit = async (values: PostFormValues) => {
    const tagsArray =
      values.tags
        ?.split(',')
        .map((t) => t.trim())
        .filter(Boolean) ?? [];

    await mutateAsync({
      title: values.title,
      body: values.body,
      tags: tagsArray,
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      views: 0,
      userId: user!.id,
      createdAt: new Date().toISOString(),
    });

    toast.success('Post has been created');

    router.push('/');
  };

  return (
    <PostMutateForm
      submitLabel="Create post"
      onSubmit={handleSubmit}
      isPending={isPending}
      serverError={error as Error | null}
    />
  );
};

export default CreatePostForm;
