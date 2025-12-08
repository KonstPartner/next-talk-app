import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useToggleCommentLike } from '@features/comments/api/hooks';
import type { PostComment } from '@features/comments/model/types';
import { Post } from '@features/posts/model';

const LikeComment = ({
  postId,
  comment,
}: {
  postId: Post['id'];
  comment: PostComment;
}) => {
  const router = useRouter();
  const { user, login } = useAuth();

  const likedComments = user?.likedComments ?? [];
  const isLiked = user ? likedComments.includes(comment.id) : false;

  const { mutate: toggleLike, isPending: isLiking } =
    useToggleCommentLike(postId);

  const handleLike = () => {
    if (!user) {
      toast.info('Please sign in to like comments');
      router.push('/login');

      return;
    }

    toggleLike(
      { comment, user },
      {
        onSuccess: ({ updatedUser }) => {
          login(updatedUser);
        },
        onError: () => {
          toast.error('Failed to like comment');
        },
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isLiking}
      className={`hover:text-primary flex cursor-pointer items-center gap-1 disabled:cursor-not-allowed ${
        isLiked ? 'text-primary' : 'hover:text-foreground'
      }`}
      title="Like comment"
    >
      <ThumbsUp className="h-3.5 w-3.5" />
      <span>{comment.likes}</span>
    </button>
  );
};

export default LikeComment;
