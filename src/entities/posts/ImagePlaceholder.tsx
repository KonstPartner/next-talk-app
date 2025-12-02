import { Image as ImageIcon } from 'lucide-react';

const ImagePlaceholder = () => {
  return (
    <div className="bg-muted flex aspect-2/1 w-full items-center justify-center overflow-hidden rounded-lg">
      <ImageIcon size="68" color="purple" />
    </div>
  );
};

export default ImagePlaceholder;
