'use client';

import { useForm } from 'react-hook-form';

import { PostFormValues } from '@features/posts/model';
import { Button, Input } from '@entities/shared';

type PostMutateFormProps = {
  initialValues?: Partial<PostFormValues>;
  submitLabel: string;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  isPending?: boolean;
  serverError?: Error | null;
};

const PostMutateForm = ({
  initialValues,
  submitLabel,
  onSubmit,
  isPending = false,
  serverError,
}: PostMutateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    mode: 'onBlur',
    defaultValues: {
      title: initialValues?.title ?? '',
      body: initialValues?.body ?? '',
      tags: initialValues?.tags ?? '',
    },
  });

  const submitHandler = handleSubmit(async (values) => {
    const trimmed = {
      title: values.title.trim(),
      body: values.body.trim(),
      tags: values.tags.trim(),
    };

    if (!trimmed.title || !trimmed.body) {
      return;
    }

    await onSubmit(trimmed);
  });

  return (
    <form
      onSubmit={submitHandler}
      className="border-border bg-background-secondary mx-auto flex w-full max-w-xl flex-col gap-4 rounded-xl border p-6 shadow-sm"
      noValidate
    >
      <h1 className="text-foreground text-center text-xl font-semibold tracking-tight">
        {submitLabel}
      </h1>

      {serverError && (
        <p className="text-sm text-red-500" role="alert">
          {serverError.message || 'Something went wrong'}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-foreground text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          placeholder="Enter title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
        />
        {errors.title && (
          <p className="text-xs text-red-500" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-foreground text-sm font-medium">
          Body
        </label>
        <textarea
          id="body"
          rows={5}
          className="border-border bg-background text-foreground focus:border-primary focus:ring-primary/50 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          placeholder="Write your post..."
          {...register('body', {
            required: 'Body is required',
            minLength: {
              value: 10,
              message: 'Body must be at least 10 characters',
            },
          })}
        />
        {errors.body && (
          <p className="text-xs text-red-500" role="alert">
            {errors.body.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tags" className="text-foreground text-sm font-medium">
          Tags
        </label>
        <Input
          id="tags"
          placeholder="e.g. news, tech, personal"
          {...register('tags')}
        />
        <p className="text-foreground/60 text-xs">
          Separate tags with commas (e.g. <code>news, tech, opinion</code>)
        </p>
      </div>

      <Button
        type="submit"
        className="mt-2 w-full cursor-pointer"
        disabled={isPending || isSubmitting}
      >
        {isPending || isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  );
};

export default PostMutateForm;
