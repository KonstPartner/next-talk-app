'use client';

import { useParams } from 'next/navigation';

import { PostSection } from '@features/posts/ui';
import { Loader } from '@features/shared/ui';

const Post = () => {
  const params = useParams();
  const id = Number(params?.id);

  return (
    <div className="container">
      <Loader>
        <PostSection id={id} />
      </Loader>
    </div>
  );
};

export default Post;
