import { Dropdown } from "../../entities/dropdown/Dropdown";
import { HeaderProps as Props } from "./types";
import { Checkbox } from "../../shared";
import { useRecoilValue } from "recoil";
import { folderStateAtom } from "../../../store/atoms/folder";

export const Header = ({
  disabled,
  checked,
  selectedValue,
  isSelected,
  onClick,
}: Props) => {
  const { media, selected } = useRecoilValue(folderStateAtom);
  const selectedFolder = media.find((folder) => folder.id === selected);

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
          selected={selected}
          label={selectedFolder.label}
        />
      )}
    </div>
  );
};
