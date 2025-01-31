import { ReactElement, useEffect, useCallback, useState } from "react";
import { ImageGallery } from "../../entities";
import { Header } from "./Header";
import { MediaItem } from "../../utils/types";
import { fetchMedia } from "../../../api/fetchMedia";
import { convertMediaData } from "../../../api/converters/fetchMediaConverter";
import { fetchFolders } from "../../../api/fetchFolders";
import { convertFolderData } from "../../../api/converters/fetchFolderConverter";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/localStorageUtils";
import { ELocalStorageKey } from "../../utils/enum";
import {
  addData,
  addMediaToFolder,
  getAllData,
  removeMediaFromFolder,
} from "../../../db/indexDB";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  folderStateAtom,
  mediaStateAtom,
  selectorFolderWithMedia,
} from "../../../store";

export const Frame = (): ReactElement => {
  const selectedFolderID = getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [, setMedia] = useRecoilState<MediaItem[]>(mediaStateAtom);
  const [folder, setFolder] = useRecoilState<MediaItem[]>(folderStateAtom);
  const selectedFolder = useRecoilValue(selectorFolderWithMedia);

  const fillData = async () => {
    try {
      const mediaData = await fetchMedia();
      const convertedMedia = convertMediaData(mediaData);
      setMedia(convertedMedia);

      const folderData = await fetchFolders();
      const convertedFolder = convertFolderData(folderData);
      setFolder((prevFolders) => ({
        ...prevFolders,
        selectedId: getLocalStorage(ELocalStorageKey.SELECTED_FOLDER),
        media: convertedFolder,
      }));

      setLocalStorage(ELocalStorageKey.SELECTED_FOLDER, "1");

      for (const mediaItem of convertedMedia) {
        await addData("media", mediaItem);
      }

      for (const folderItem of convertedFolder) {
        await addData("folder", folderItem);
      }

      console.log("Data successfully added to IndexedDB");
    } catch (error) {
      console.error("Error fetching and adding data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbMedia = await getAllData("media");
        const dbFolder = await getAllData("folder");

        if (dbMedia.length === 0 || dbFolder.length === 0) {
          await fillData();
          return;
        }

        setMedia(dbMedia);
        setFolder({
          selectedId: getLocalStorage(ELocalStorageKey.SELECTED_FOLDER),
          media: dbFolder,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isSelected = selectedMedia.length !== 0;

  useEffect(() => {
    if (isSelected) {
      setSelectedMedia([]);
    }
  }, [folder.selectedId]);

  const handleToggle = useCallback((id: string) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  }, []);

  const handleFolderId = useCallback(
    async (id: string) => {
      setSelectedMedia([]);
      await removeMediaFromFolder(selectedFolderID, selectedMedia);
      await addMediaToFolder(id, selectedMedia);

      setFolder((prevState) => {
        if (!prevState || !prevState.media) return prevState;

        const updatedMedia = prevState.media.map((folder) => {
          if (folder.id === id) {
            const newMediaIds = selectedMedia.filter(
              (mediaId) => !folder.mediaId.includes(mediaId),
            );
            if (newMediaIds.length > 0) {
              return {
                ...folder,
                mediaId: [...folder.mediaId, ...newMediaIds],
              };
            }
            return folder;
          }

          if (folder.id === selectedFolderID) {
            return {
              ...folder,
              mediaId: folder.mediaId.filter(
                (mediaId) => !selectedMedia.includes(mediaId),
              ),
            };
          }

          return folder;
        });

        const isMediaChanged = updatedMedia.some((folder, index) => {
          const originalFolder = prevState.media[index];
          return folder.mediaId.length !== originalFolder.mediaId.length;
        });

        if (isMediaChanged) {
          return {
            ...prevState,
            media: updatedMedia,
          };
        }

        return prevState;
      });
    },
    [selectedFolderID, selectedMedia, selectedFolder],
  );

  return (
    <div className="flex-6 w-full p-3">
      <Header
        disabled={!selectedMedia.length}
        checked={selectedMedia.length > 0}
        isSelected={isSelected}
        selectedValue={selectedMedia.length}
        onFolderId={handleFolderId}
        onClick={() => {
          if (isSelected) {
            setSelectedMedia([]);
          }
        }}
      />
      <div className="w-full h-[1px] bg-gray-100 my-2" />
      <ImageGallery
        images={selectedFolder?.media ?? []}
        onToggle={handleToggle}
        selectedMedia={selectedMedia}
      />
    </div>
  );
};
