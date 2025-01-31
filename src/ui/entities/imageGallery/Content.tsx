import { Media } from "./Media";
import { ResizeMedia } from "./ResizeMedia";
import { CheckBoxNumber } from "./CheckBoxNumber";
import { useState } from "react";
import { Text } from "../../shared";

const itemsPerPage = 10;

export const Content = ({ images, selectedMedia, onToggle }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const buttonStyle = "px-2 py-2 bg-gray-300 rounded-lg cursor-pointer";

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

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
            className={buttonStyle}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        )}

        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>

        {totalPages > 1 && currentPage !== totalPages && (
          <button
            className={buttonStyle}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
