import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Checkbox } from "../../shared";
import { CollapseProps } from "./types";
import { useRecoilState } from "recoil";
import { filterStateAtom } from "../../../store";

export const Collapse = ({ onClick, isFilterOpen }: CollapseProps) => {
  const [filter, setFilter] = useRecoilState(filterStateAtom);

  const handleCheckboxClick = () => {
    const { mediaType, ...restFilters } = filter;
    const isMediaTypeDisabled = !mediaType;
    const isAnyFilterEnabled = Object.values(restFilters).some(Boolean);

    setFilter({
      ...filter,
      ...(isMediaTypeDisabled && !isAnyFilterEnabled
        ? { image: true, gif: true, video: true }
        : {}),
      mediaType: isMediaTypeDisabled,
    });
  };

  return (
    <div className="flex mx-3">
      <div
        className="cursor-pointer items-center flex flex-1 mb-[7px] text-[12px] text-gray-400 font-extralight"
        onClick={onClick}
      >
        Media type
        {isFilterOpen ? (
          <MdKeyboardArrowUp size={15} className="ml-2" />
        ) : (
          <MdKeyboardArrowDown size={15} className="ml-2" />
        )}
      </div>
      <Checkbox checked={filter.mediaType} onClick={handleCheckboxClick} />
    </div>
  );
};
