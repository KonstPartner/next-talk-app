import { useSuspensePost } from '@features/posts/api';
import EditPostForm from '@features/posts/ui/EditPostForm';

const EditPostSection = ({ id }: { id: number }) => {
  const { data: post } = useSuspensePost(id);

  return <EditPostForm post={post} />;
};

export default EditPostSection;
