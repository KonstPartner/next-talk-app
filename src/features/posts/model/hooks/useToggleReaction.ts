import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useApiToggleReaction } from '@features/posts/api';
import { Post, usePostsFilters } from '@features/posts/model';

const useToggleReaction = ({ post }: { post: Post }) => {
  const { sort, appliedFilters } = usePostsFilters();
  const { mutate, isPending: isToggling } = useApiToggleReaction(
    sort,
    appliedFilters
  );
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

  return { isToggling, isLiked, isDisliked, handleReactionClick };
};

export default useToggleReaction;
