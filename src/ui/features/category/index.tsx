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
import { filterStateAtom, folderStateAtom } from "../../../store";
import { determineMediaCount } from "./determineMediaCount";
import { Collapse } from "./Collapse";

export const Category = ({ label, items }: Props): ReactElement => {
  const [folder, setFolder] = useRecoilState<Folder>(folderStateAtom);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [, setFilter] = useRecoilState(filterStateAtom);
  const { selectedId } = folder;
  let _type;

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

  const itemList = items.map(({ id, mediaId, label, type, isChecked }) => {
    _type = type;
    const count =
      type === "folder" ? mediaId?.length : determineMediaCount(type);

    return (
      <Item
        key={id}
        id={id}
        type={type}
        label={label}
        count={count}
        selected={selectedId === id}
        isCheckbox={isChecked}
        onClick={() =>
          type === "folder" ? handleFolderSelect(id) : handleFilterSelect(type)
        }
      />
    );
  });

  return (
    <div className="mb-[20px]">
      <div className="mb-4 ml-3">
        <Text>{label}</Text>
      </div>
      {_type !== "folder" && (
        <Collapse
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          isFilterOpen={isFilterOpen}
        />
      )}
      {isFilterOpen && itemList}
    </div>
  );
};
