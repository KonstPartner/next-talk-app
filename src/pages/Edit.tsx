'use client';

import { useParams } from 'next/navigation';

import { useAuth } from '@features/auth/model';
import EditPostSection from '@features/posts/ui/EditPostSection';
import { Loader } from '@features/shared/ui';

const EditPost = () => {
  const { user } = useAuth();
  const params = useParams();

  const id = Number(params?.id);

  if (!user) {
    return null;
  }

  return (
    <div className="container py-6">
      <Loader>
        <EditPostSection id={id} />
      </Loader>
    </div>
  );
};

export default EditPost;
