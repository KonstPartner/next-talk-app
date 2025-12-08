'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@entities/shared';

type CommentFormValues = {
  body: string;
};

type CommentFormProps = {
  onSubmit: (body: string) => Promise<void> | void;
  isSubmitting?: boolean;
};

const CommentForm = ({ onSubmit, isSubmitting = false }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: rhfSubmitting },
  } = useForm<CommentFormValues>({
    defaultValues: {
      body: '',
    },
    mode: 'onBlur',
  });

  const submitHandler = handleSubmit(async ({ body }) => {
    const trimmed = body.trim();
    if (!trimmed) {
      return;
    }

    await onSubmit(trimmed);
    reset({ body: '' });
  });

  const disabled = isSubmitting || rhfSubmitting;

  return (
    <form
      onSubmit={submitHandler}
      className="border-border bg-background-secondary mb-4 flex flex-col gap-2 rounded-xl border px-4 py-3"
      noValidate
    >
      <label
        htmlFor="new-comment"
        className="text-foreground/80 text-xs font-medium"
      >
        Add a comment
      </label>
      <textarea
        id="new-comment"
        rows={3}
        className="border-border bg-background text-foreground focus:border-primary focus:ring-primary/40 w-full rounded-md border px-3 py-2 text-sm transition outline-none focus:ring-2"
        placeholder="Write your comment..."
        {...register('body', {
          required: 'Comment text is required',
          minLength: {
            value: 2,
            message: 'Comment must be at least 2 characters',
          },
        })}
      />
      {errors.body && (
        <p className="text-xs text-red-500" role="alert">
          {errors.body.message}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={disabled}
          className="cursor-pointer px-4 py-1.5 text-xs"
        >
          {disabled ? 'Posting…' : 'Post comment'}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
