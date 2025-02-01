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
import { addData, getAllData } from "../../../db/indexDB";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  folderStateAtom,
  mediaStateAtom,
  selectorFolderWithMedia,
} from "../../../store";
import { FrameProps } from "./types";
import { useMoveMedia } from "../../hooks/moveMediaHook";

export const Frame = ({
  onDataFetched,
  clearSelectedMedia,
}: FrameProps): ReactElement => {
  const selectedFolderID = getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [, setMedia] = useRecoilState<MediaItem[]>(mediaStateAtom);
  const [folder, setFolder] = useRecoilState<MediaItem[]>(folderStateAtom);
  const selectedFolder = useRecoilValue(selectorFolderWithMedia);
  const moveMedia = useMoveMedia();

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

      setLocalStorage(ELocalStorageKey.SELECTED_FOLDER, "200");

      for (const mediaItem of convertedMedia) {
        await addData("media", mediaItem);
      }

      for (const folderItem of convertedFolder) {
        await addData("folder", folderItem);
      }

      onDataFetched(true);
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
        onDataFetched(true);
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
  }, [selectedFolderID, folder.selectedId, clearSelectedMedia]);

  const handleToggle = useCallback((id: string) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  }, []);

  const handleFolderId = useCallback(
    async (id: string) => {
      setSelectedMedia([]);
      await moveMedia(selectedMedia, id);
    },
    [selectedFolderID, selectedMedia],
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
          isSelected && setSelectedMedia([]);
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
