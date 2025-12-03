import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useToggleReaction } from '@features/posts/api';
import { Post } from '@features/posts/model';

const ToggleReaction = ({ post }: { post: Post }) => {
  const { mutate, isPending: isToggling } = useToggleReaction();
  const { user, login } = useAuth();
  const router = useRouter();

  const likedPosts = user?.likedPosts ?? [];
  const dislikedPosts = user?.dislikedPosts ?? [];

  const isLiked = user ? likedPosts.includes(post.id) : false;
  const isDisliked = user ? dislikedPosts.includes(post.id) : false;

  const handleRequireAuth = () => {
    toast.info('Please sign in to react');
    router.push('/login');
  };

  const handleReactionClick = (action: 'like' | 'dislike') => {
    if (!user) {
      handleRequireAuth();

      return;
    }

    mutate(
      { post, user, action },
      {
        onSuccess: ({ updatedUser }) => {
          login(updatedUser);
        },
        onError: () => {
          toast.error('Failed to update reaction');
        },
      }
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleReactionClick('like')}
        disabled={isToggling}
        className={`flex cursor-pointer items-center gap-1 ${
          isLiked ? 'text-primary' : 'hover:text-foreground'
        }`}
        title="Like"
      >
        <ThumbsUp className="h-4 w-4" />
        {post.reactions.likes}
      </button>

      <button
        type="button"
        onClick={() => handleReactionClick('dislike')}
        disabled={isToggling}
        className={`flex cursor-pointer items-center gap-1 ${
          isDisliked ? 'text-red-500' : 'hover:text-foreground'
        }`}
        title="Dislike"
      >
        <ThumbsDown className="h-4 w-4" />
        {post.reactions.dislikes}
      </button>
    </>
  );
};

export default ToggleReaction;
