import { Checkbox, Text } from "../../shared";
import { ReactElement, useMemo } from "react";
import { Item as Props } from "../../utils/types";
import { determineImage } from "./determineImage";
import { useDroppable } from "@dnd-kit/core";

export const Item = ({
  label,
  id,
  type,
  count,
  isCheckbox,
  selected,
  onClick,
}: Props): ReactElement => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const elementImage = useMemo(() => determineImage(type), [type]);
  const styleClass =
    selected && type === "folder"
      ? isOver
        ? "bg-red-100"
        : "bg-gray-100"
      : isOver
        ? "bg-emerald-100"
        : "";

  return (
    <label
      ref={type === "folder" ? setNodeRef : null}
      className={`flex rounded-md h-[32px] px-3 mb-1 cursor-pointer ${styleClass}`}
      onClick={type === "folder" ? onClick : undefined}
    >
      <div className="flex flex-1 items-center">
        {elementImage}
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
