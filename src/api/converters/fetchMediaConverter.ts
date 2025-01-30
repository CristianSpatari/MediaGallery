import { MediaItem } from "../../ui/utils/types";

export const convertMediaData = (data: MediaItem[]): MediaItem[] => {
  return data.map((item) => ({
    ...item,
    label: item.label.toLowerCase(),
    alt: item.label.toLowerCase(),
  }));
};
