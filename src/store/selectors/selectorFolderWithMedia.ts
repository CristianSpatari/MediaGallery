import { selector } from "recoil";
import { folderStateAtom } from "../atoms/folder";
import { mediaStateAtom } from "../atoms/media";

export const selectorFolderWithMedia = selector({
  key: "selectorFolderWithMedia",
  get: ({ get }) => {
    const folderState = get(folderStateAtom);
    const selectedFolderId = folderState.selectedId;
    const folders = folderState.media;
    const mediaList = get(mediaStateAtom);

    const selectedFolder = folders.find(
      (folder) => folder.id === selectedFolderId,
    );

    if (selectedFolder) {
      const mediaInFolder = selectedFolder.mediaId.map((mediaId) =>
        mediaList.find((media) => media.id === mediaId),
      );

      return {
        ...selectedFolder,
        media: mediaInFolder.filter((media) => media !== undefined),
      };
    }

    return null;
  },
});
