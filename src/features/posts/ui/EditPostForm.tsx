'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useUpdatePost } from '@features/posts/api/hooks';
import type { Post, PostFormValues } from '@features/posts/model';
import PostMutateForm from '@entities/posts/PostMutateForm';

type EditPostFormProps = {
  post: Post;
};

const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useUpdatePost();

  const initialValues: PostFormValues = {
    title: post.title,
    body: post.body,
    tags: post.tagIds,
  };

  const handleSubmit = async (values: PostFormValues) => {
    await mutateAsync({
      ...post,
      title: values.title,
      body: values.body,
      tagIds: values.tags,
    });

    toast.success('Post has been updated');

    router.push('/');
  };

  return (
    <PostMutateForm
      initialValues={initialValues}
      submitLabel="Update post"
      onSubmit={handleSubmit}
      isPending={isPending}
      serverError={error as Error | null}
    />
  );
};

export default EditPostForm;
