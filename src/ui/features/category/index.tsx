import { ReactElement, useCallback, useEffect, useState } from "react";
import { Text } from "../../shared";
import { Props } from "./types";
import { Item } from "../../entities";
import { useRecoilState } from "recoil";
import { Folder } from "../../utils/types";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/localStorageUtils";
import { ELocalStorageKey } from "../../utils/enum";
import { folderStateAtom } from "../../../store";
import { determineMediaCount } from "./determineMediaCount";

export const Category = ({ label, items }: Props): ReactElement => {
  const [folder, setFolder] = useRecoilState<Folder>(folderStateAtom);
  const [filter, setFilter] = useState({
    image: true,
    gif: true,
    video: true,
  });
  const { selectedId } = folder;

  useEffect(() => {
    if (!selectedId) {
      getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);
    } else {
      setLocalStorage(ELocalStorageKey.SELECTED_FOLDER, selectedId);
    }
  }, [selectedId]);

  const handleFolderSelect = useCallback(
    (id: string) => {
      setFolder((prev) => ({
        ...prev,
        selectedId: prev.selectedId === id ? selectedId : id,
      }));
    },
    [selectedId],
  );

  const handleFilterSelect = useCallback((id: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [id]: !prevFilter[id],
    }));
  }, []);

  return (
    <div className="mt-[32px]">
      <div className="mb-4 ml-1">
        <Text>{label}</Text>
      </div>
      {items.map(({ id, mediaId, label, type, isChecked }) => {
        const count =
          type === "folder" ? mediaId?.length : determineMediaCount(type);

        return (
          <Item
            key={id}
            type={type}
            label={label}
            count={count}
            selected={selectedId === id}
            isCheckbox={isChecked}
            onClick={() =>
              type === "folder"
                ? handleFolderSelect(id)
                : handleFilterSelect(type)
            }
          />
        );
      })}
    </div>
  );
};
