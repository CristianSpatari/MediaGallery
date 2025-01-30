import { ReactElement } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { BsFolder2Open } from "react-icons/bs";
import { Text } from "../../shared";

export const Dropdown = (): ReactElement => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded h-[32px] flex items-center gap-1 border border-gray-200">
          <BsFolder2Open size={16} />
          <Text className="ml-[6px] mr-[8px]">Mefasfdnu</Text>
          <IoIosArrowDown size={16} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-white shadow-md rounded p-2 z-[100]"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        <DropdownMenu.Item
          className="p-2 cursor-pointer hover:bg-gray-100"
          onSelect={() => alert("Action 1 executed")}
        >
          Action 1
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="p-2 cursor-pointer hover:bg-gray-100"
          onSelect={() => alert("Action 2 executed")}
        >
          Action 2
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
