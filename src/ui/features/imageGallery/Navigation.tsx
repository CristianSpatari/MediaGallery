import { NavigationProps } from "./types";

export const Navigation = ({
  currentPage,
  totalPages,
  onHandlePageChange,
}: NavigationProps) => {
  const buttonStyle = "px-2 py-2 bg-gray-300 rounded-lg cursor-pointer";

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onHandlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onHandlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {currentPage !== 1 && (
        <button
          className={buttonStyle}
          onClick={handlePrevClick}
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
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      )}
    </div>
  );
};
