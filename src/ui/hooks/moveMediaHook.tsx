import { useRecoilState } from "recoil";
import { addMediaToFolder, removeMediaFromFolder } from "../../db/indexDB";
import { folderStateAtom } from "../../store";
import { getLocalStorage } from "../utils/localStorageUtils";
import { ELocalStorageKey } from "../utils/enum";

export const useMoveMedia = () => {
  const [, setFolder] = useRecoilState(folderStateAtom);
  const selectedFolderID = getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);

  return async (mediaIds: string[], folderId: string) => {
    if (!mediaIds.length || !folderId || !selectedFolderID) return;

    await removeMediaFromFolder(selectedFolderID, mediaIds);
    await addMediaToFolder(folderId, mediaIds);

    setFolder((prevState) => {
      if (!prevState || !prevState.media) return prevState;

      const updatedMedia = prevState.media.map((folder) => {
        if (folder.id === folderId) {
          const newMediaIds = mediaIds.filter(
            (mediaId) => !folder.mediaId.includes(mediaId),
          );
          return { ...folder, mediaId: [...folder.mediaId, ...newMediaIds] };
        }

        if (folder.id === selectedFolderID) {
          return {
            ...folder,
            mediaId: folder.mediaId.filter(
              (mediaId) => !mediaIds.includes(mediaId),
            ),
          };
        }

        return folder;
      });

      return { ...prevState, media: updatedMedia };
    });
  };
};
