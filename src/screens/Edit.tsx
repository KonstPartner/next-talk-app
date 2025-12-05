'use client';

import { useParams } from 'next/navigation';

import { useAuth } from '@features/auth/model';
import { EditPostForm } from '@features/posts/ui';
import { Loader } from '@features/shared/ui';

const EditPost = () => {
  const { user } = useAuth();
  const params = useParams();

  const id = Number(params?.id);

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <Loader>
        <EditPostForm id={id} />
      </Loader>
    </div>
  );
};

export default EditPost;
