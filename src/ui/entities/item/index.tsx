import { Checkbox, Text } from "../../shared";
import { ReactElement } from "react";
import { Item as Props } from "../../utils/types";
import { BsFolder2Open } from "react-icons/bs";

export const Item = ({
  label,
  count,
  isCheckbox,
  selected,
  onClick,
}: Props): ReactElement => {
  return (
    <label
      className={`flex rounded-md h-[32px] px-3 mb-1 cursor-pointer ${selected ? "bg-gray-100" : ""}`}
      onClick={onClick}
    >
      <div className="flex flex-1 items-center">
        <BsFolder2Open />
        <Text className="ml-2">{label}</Text>
        <Text className="ml-2">{count ?? 0}</Text>
      </div>
      {isCheckbox && <Checkbox defaultChecked />}
    </label>
  );
};
