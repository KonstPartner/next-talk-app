import { Image as ImageIcon } from 'lucide-react';

const ImagePlaceholder = () => {
  return (
    <div
      className="bg-muted flex aspect-2/1 w-full items-center justify-center overflow-hidden rounded-lg"
      aria-hidden="true"
    >
      <ImageIcon size="68" color="purple" aria-hidden="true" />
    </div>
  );
};

export default ImagePlaceholder;
