import { ReactElement } from "react";
import { Text } from "../../shared";
import { Props } from "./types";
import { Item } from "../../entities";
import { useRecoilState } from "recoil";
import { folderStateAtom } from "../../../store/atoms/folder";
import { Folder } from "../../utils/types";

export const Category = ({ label, items }: Props): ReactElement => {
  const [folder, setFolder] = useRecoilState<Folder>(folderStateAtom);
  const { selected } = folder;

  const handleSelect = (id: string) => {
    setFolder((prev) => ({
      ...prev,
      selected: prev.selected === id ? selected : id,
    }));
  };

  return (
    <div className="mt-[32px]">
      <div className="mb-4 ml-1">
        <Text>{label}</Text>
      </div>
      {items.map(({ id, mediaId, label }) => (
        <Item
          key={id}
          label={label}
          count={mediaId.length}
          selected={selected === id}
          isCheckbox={false}
          onClick={() => handleSelect(id)}
        />
      ))}
    </div>
  );
};
