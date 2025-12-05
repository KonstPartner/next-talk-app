'use client';

import { useParams } from 'next/navigation';

import { Loader } from '@features/shared/ui';
import { PostSection } from '@entities/posts';

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
