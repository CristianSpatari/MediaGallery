import { ReactElement } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { BsFolder2Open } from "react-icons/bs";
import { Text } from "../../shared";
import { Props } from "./types";

export const Dropdown = ({
  items,
  label,
  selectedId,
  onFolderId,
}: Props): ReactElement => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded h-[32px] flex items-center gap-1 border border-gray-200">
          <BsFolder2Open size={16} />
          <Text className="ml-[6px] mr-[8px]">{label}</Text>
          <IoIosArrowDown size={16} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-white shadow-md rounded p-2 z-[100]"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        {items?.map((el) => {
          const { label, id } = el;
          const isSelected = id === selectedId;
          const styleItemBackground = isSelected
            ? "bg-gray-100"
            : "hover:bg-blue-200";

          return (
            <DropdownMenu.Item
              key={id}
              className={`p-2 cursor-pointer ${styleItemBackground}`}
              onSelect={() => onFolderId(id)}
            >
              {label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
