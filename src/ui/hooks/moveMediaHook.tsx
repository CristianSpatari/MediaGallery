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

    removeMediaFromFolder(selectedFolderID, mediaIds)
      .then(() =>
        console.log(
          `Successfully removed media IDs: ${mediaIds} from folder ${selectedFolderID}`,
        ),
      )
      .catch((error) =>
        console.error(
          `Failed to remove media IDs: ${mediaIds} from folder ${selectedFolderID}`,
          error,
        ),
      );

    addMediaToFolder(folderId, mediaIds)
      .then(() =>
        console.log(
          `Successfully added media IDs: ${mediaIds} to folder ${folderId}`,
        ),
      )
      .catch((error) =>
        console.error(
          `Failed to add media IDs: ${mediaIds} to folder ${folderId}`,
          error,
        ),
      );

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
