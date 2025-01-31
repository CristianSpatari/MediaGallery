import { Checkbox, Text } from "../../shared";
import { ReactElement } from "react";
import { Item as Props } from "../../utils/types";
import { determineImage } from "./determineImage";
import { useRecoilValue } from "recoil";
import { filterStateAtom } from "../../../store";

export const Item = ({
  label,
  type,
  count,
  isCheckbox,
  selected,
  onClick,
}: Props): ReactElement => {
  const filter = useRecoilValue(filterStateAtom);
  console.log("filter: ", filter);
  return (
    <label
      className={`flex rounded-md h-[32px] px-3 mb-1 cursor-pointer ${selected && type === "folder" ? "bg-gray-100" : ""}`}
      onClick={type === "folder" ? onClick : undefined}
    >
      <div className="flex flex-1 items-center">
        {determineImage(type)}
        <Text className="ml-2">{label}</Text>
        <Text className="ml-2">{count ?? 0}</Text>
      </div>
      {isCheckbox && (
        <Checkbox
          defaultChecked
          onClick={type !== "folder" ? onClick : undefined}
        />
      )}
    </label>
  );
};
