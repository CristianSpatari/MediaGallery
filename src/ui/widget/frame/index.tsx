import { ReactElement, useEffect, useState } from "react";
import { ImageGallery } from "../../entities";
import { MediaItem } from "../../utils/types";
import { fetchMedia } from "../../../api/fetchMedia";
import { convertMediaData } from "../../../api/converters/fetchMediaConverter";
import { Checkbox } from "../../shared";

import { Dropdown } from "../../entities/dropdown/Dropdown";

export const Frame = (): ReactElement => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const isSelected = selectedMedia.length !== 0;

  useEffect(() => {
    fetchMedia().then((data) => {
      setMedia(convertMediaData(data));
    });
  }, []);

  const handleToggle = (id: string) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex-6 w-full p-4">
      <div className="flex items-center gap-2">
        <Checkbox
          disabled={!selectedMedia.length}
          id="scales"
          name="scales"
          onClick={() => setSelectedMedia([])}
          checked={selectedMedia.length > 0}
        />
        <label className="mr-[10px]" htmlFor="scales">
          {selectedMedia.length} Selected
        </label>
        {isSelected && <Dropdown />}
      </div>
      <div className="w-full h-[1px] bg-gray-100 my-2" />
      <ImageGallery
        images={media}
        onToggle={handleToggle}
        selectedMedia={selectedMedia}
      />
    </div>
  );
};
