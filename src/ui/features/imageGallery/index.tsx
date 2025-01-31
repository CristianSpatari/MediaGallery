import { ImageGalleryProps } from "./types";
import { NoMedia } from "./NoMedia";
import { Content } from "./Content";

export const ImageGallery = ({
  images,
  selectedMedia,
  onToggle,
}: ImageGalleryProps) => {
  const imagesCount = images.length;

  return imagesCount ? (
    <Content
      images={images}
      selectedMedia={selectedMedia}
      onToggle={onToggle}
    />
  ) : (
    <NoMedia />
  );
};
