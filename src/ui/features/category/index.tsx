import { ReactElement } from "react";
import { Text } from "../../shared";
import { Item } from "../../entities";
import { Props } from "./types";

export const Category = ({ label, items }: Props): ReactElement => {
  return (
    <div className="mt-[32px]">
      <div className="mb-4 ml-1">
        <Text>{label}</Text>
      </div>
      {items.map(({ id, icon, label, count, isCheckbox, selected }, index) => (
        <Item
          id={id}
          selected={selected}
          className="pt-[16px]"
          key={index}
          icon={icon}
          label={label}
          count={count}
          isCheckbox={isCheckbox}
        />
      ))}
    </div>
  );
};
