import { Media } from "./Media";
import { ResizeMedia } from "./ResizeMedia";
import { CheckBoxNumber } from "./CheckBoxNumber";
import { useDraggable } from "@dnd-kit/core";
import { EditableText } from "../../entities";

export const Image = ({ image, selectedMedia, onToggle }) => {
  const { id, src, alt, type, label, extension } = image;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  const isSelected = selectedMedia.includes(id);
  const index = selectedMedia.indexOf(id);
  const styleBorder = isSelected ? "border-blue-500" : "border-white";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={id}
      className="flex flex-col"
    >
      <div
        className={`relative cursor-pointer overflow-hidden rounded-lg group border-2 ${
          styleBorder
        } outline outline-4 outline-transparent hover:outline-gray-100`}
        onClick={() => onToggle(id)}
      >
        <Media alt={alt || "No media found"} src={src} type={type} />
        <ResizeMedia id={id} />
        <CheckBoxNumber isChecked={isSelected} index={index} />
      </div>
      <div className="mt-1 text-center">
        <EditableText
          mediaId={id}
          className="text-xs"
          label={label}
          extension={extension}
        />
      </div>
    </div>
  );
};
