import { atom } from "recoil";
import { MediaItem } from "../../ui/utils/types";

export const mediaStateAtom = atom<MediaItem[]>({
  key: "mediaStateAtom",
  default: [],
});
