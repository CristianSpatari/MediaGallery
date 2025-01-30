import { Text } from "../../shared";
import { ImageGalleryProps } from "./types";
import { CheckBoxNumber } from "./CheckBoxNumber";
import { ResizeMedia } from "./ResizeMedia";
import { Media } from "./Media";
import { useState } from "react";

const itemsPerPage = 10;

export const ImageGallery = ({
  images,
  selectedMedia,
  onToggle,
}: ImageGalleryProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 pt-4">
        {currentImages.map((image) => {
          const { id, src, alt, type, label, extension } = image;
          const isSelected = selectedMedia.includes(id);
          const index = selectedMedia.indexOf(id);
          const styleBorder = isSelected ? "border-blue-500" : "border-white";

          return (
            <div key={id} className="flex flex-col">
              <div
                className={`relative cursor-pointer overflow-hidden rounded-lg group border-2 ${
                  styleBorder
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

      {/* //TODO: Add to new component */}
      <div className="flex justify-center items-center mt-4">
        {currentPage !== 1 && (
          <button
            className="px-2 py-2 bg-gray-300 rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        )}

        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-2 py-2 bg-gray-300 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
