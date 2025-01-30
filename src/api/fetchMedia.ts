import { MediaItem } from "../ui/utils/types";
import { mockMediaData } from "../ui/utils/mock";

export const fetchMedia = (): Promise<MediaItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMediaData);
    }, 1000);
  });
};
