import { selector } from "recoil";
import { folderStateAtom } from "../atoms/folder";
import { mediaStateAtom } from "../atoms/media";
import { filterStateAtom } from "../atoms/filter";

export const selectorFolderWithMedia = selector({
  key: "selectorFolderWithMedia",
  get: ({ get }) => {
    const folderState = get(folderStateAtom);
    const mediaList = get(mediaStateAtom);
    const filterState = get(filterStateAtom);

    const selectedFolder = folderState.media.find(
      (folder) => folder.id === folderState.selectedId,
    );

    if (!selectedFolder) return null;

    const filteredMedia = selectedFolder.mediaId
      .map((id) => mediaList.find((media) => media.id === id))
      .filter((media) => media !== undefined && filterState[media.type]);

    return { ...selectedFolder, media: filteredMedia };
  },
});
