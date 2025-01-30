import { ReactElement, useEffect, useState } from "react";
import { ImageGallery } from "../../entities";
import { MediaItem } from "../../utils/types";
import { fetchMedia } from "../../../api/fetchMedia";
import { convertMediaData } from "../../../api/converters/fetchMediaConverter";
import { Header } from "./Header";
import { useRecoilState } from "recoil";
import { mediaStateAtom } from "../../../store/atoms/media";
import { fetchFolders } from "../../../api/fetchFolders";
import { folderStateAtom } from "../../../store/atoms/folder";
import { convertFolderData } from "../../../api/converters/fetchFolderConverter";

export const Frame = (): ReactElement => {
  const [media, setMedia] = useRecoilState<MediaItem[]>(mediaStateAtom);
  const [folder, setFolder] = useRecoilState<MediaItem[]>(folderStateAtom);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const isSelected = selectedMedia.length !== 0;

  useEffect(() => {
    if (isSelected) {
      setSelectedMedia([]);
    }
  }, [folder.selected]);

  useEffect(() => {
    fetchMedia().then((data) => {
      setMedia(convertMediaData(data));
    });
    fetchFolders().then((data) => {
      setFolder((prevFolders) => ({
        ...prevFolders,
        media: convertFolderData(data),
      }));
    });
  }, []);

  const handleToggle = (id: string) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex-6 w-full p-4">
      <Header
        disabled={!selectedMedia.length}
        checked={selectedMedia.length > 0}
        isSelected={isSelected}
        selectedValue={selectedMedia.length}
        onClick={() => {
          if (isSelected) {
            setSelectedMedia([]);
          }
        }}
      />
      <div className="w-full h-[1px] bg-gray-100 my-2" />
      <ImageGallery
        images={media}
        onToggle={handleToggle}
        selectedMedia={selectedMedia}
      />
    </div>
  );
};
