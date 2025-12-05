import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { Post } from '@features/posts/model';
import { useToggleReaction } from '@features/posts/model/hooks';

const ToggleReaction = ({ post }: { post: Post }) => {
  const { isToggling, isLiked, isDisliked, handleReactionClick } =
    useToggleReaction({ post });

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
