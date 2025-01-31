import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Checkbox } from "../../shared";
import { CollapseProps } from "./types";
import { useRecoilState } from "recoil";
import { filterStateAtom } from "../../../store";

export const Collapse = ({ onClick, isFilterOpen }: CollapseProps) => {
  const [filter, setFilter] = useRecoilState(filterStateAtom);

  const handleCheckboxClick = () => {
    const newState = {
      image: !Object.values(filter).includes(true),
      gif: !Object.values(filter).includes(true),
      video: !Object.values(filter).includes(true),
    };
    setFilter(newState);
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
      <Checkbox defaultChecked onClick={handleCheckboxClick} />
    </div>
  );
};
