import { ReactElement } from "react";
import { CheckBoxNumberProps } from "./types";
import { Checkbox } from "../../shared";

export const CheckBoxNumber = ({
  isChecked,
  index,
}: CheckBoxNumberProps): ReactElement => {
  const backgroundColor = isChecked ? "bg-blue-500" : "bg-transparent";
  const borderColor = isChecked ? "border-blue-500" : "border-white";
  const opacityClass = isChecked
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <div
      className={`absolute bottom-0 left-0 transition-opacity duration-300 ${opacityClass}`}
    >
      <label
        className={`flex cursor-pointer pointer-events-none items-center justify-center w-7 h-7 ${backgroundColor} border-2 ${borderColor} rounded-md shadow-md`}
      >
        <Checkbox className="hidden peer" checked={isChecked} />
        {isChecked && index !== null ? (
          <span className="text-white text-[10px]">{index + 1}</span>
        ) : (
          <span className="w-full h-full bg-transparent rounded-sm"></span>
        )}
      </label>
    </div>
  );
};
