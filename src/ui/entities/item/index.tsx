import { Checkbox, Text } from "../../shared";
import { ReactElement } from "react";
import { Item as Props } from "../../utils/types";

export const Item = (props: Props): ReactElement => {
  const { id, icon, label, count, isCheckbox, selected } = props;

  const styleSelected = selected ? "bg-gray-100" : null;

  return (
    <label
      className={`flex rounded-md h-[32px] px-3 mb-1 cursor-pointer ${styleSelected}`}
      onClick={() => console.log(`Click on ${id}`)}
    >
      <div className="flex flex-1 items-center">
        {icon}
        <Text className="ml-2">{label}</Text>
        <Text className="ml-2">{count ?? 0}</Text>
      </div>
      {isCheckbox && <Checkbox defaultChecked />}
    </label>
  );
};
