import { useState, useEffect } from "react";
import { Image } from "./Image";
import { Navigation } from "./Navigation";

const itemsPerPage = 10;

export const Content = ({ images, selectedMedia, onToggle }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (currentImages.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentImages, currentPage]);

  return (
    <>
      <div className="grid grid-cols-6 gap-4 pt-4">
        {currentImages.map((image) => (
          <Image
            key={image.id}
            image={image}
            onToggle={onToggle}
            selectedMedia={selectedMedia}
          />
        ))}
      </div>
      <Navigation
        currentPage={currentPage}
        totalPages={totalPages}
        onHandlePageChange={handlePageChange}
      />
    </>
  );
};
