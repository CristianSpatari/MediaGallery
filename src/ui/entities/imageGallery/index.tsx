import { Text } from "../../shared";
import { ImageGalleryProps } from "./types";
import { CheckBoxNumber } from "./CheckBoxNumber";
import { ResizeMedia } from "./ResizeMedia";
import { Media } from "./Media";

export const ImageGallery = ({
  images,
  selectedMedia,
  onToggle,
}: ImageGalleryProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 pt-4">
      {images.map((image) => {
        const { id, src, alt, type, label, extension } = image;
        const isSelected = selectedMedia.includes(id);
        const index = selectedMedia.indexOf(id);

        return (
          <div key={id} className="flex flex-col">
            <div
              className={`relative cursor-pointer overflow-hidden rounded-lg group border-2 ${
                isSelected ? "border-blue-500" : "border-gray-100"
              } outline outline-4 outline-transparent hover:outline-gray-100`}
              onClick={() => onToggle(id)}
            >
              <Media alt={alt || "No media found"} src={src} type={type} />
              <ResizeMedia id={id} />
              <CheckBoxNumber isChecked={isSelected} index={index} />
            </div>
            <div className="mt-1 text-center">
              <Text className="text-xs">{`${label}.${extension}`}</Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};
