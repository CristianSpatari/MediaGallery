import { Dropdown } from "../../entities/dropdown/Dropdown";
import { HeaderProps as Props } from "./types";
import { Checkbox } from "../../shared";
import { useRecoilValue } from "recoil";
import { folderStateAtom } from "../../../store";

export const Header = ({
  disabled,
  checked,
  selectedValue,
  isSelected,
  onClick,
  onFolderId,
}: Props) => {
  const { media, selectedId } = useRecoilValue(folderStateAtom);
  const selectedFolder = media?.find((folder) => folder.id === selectedId);

  return (
    <div className="flex items-center gap-2 h-[40px]">
      <Checkbox
        disabled={disabled}
        id="scales"
        name="scales"
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
        onClick={onClick}
        checked={checked}
      />
      <label className="mr-[10px]" htmlFor="scales">
        {selectedValue} Selected
      </label>
      {isSelected && (
        <Dropdown
          items={media}
          selectedId={selectedId}
          label={selectedFolder?.label}
          onFolderId={onFolderId}
        />
      )}
    </div>
  );
};
