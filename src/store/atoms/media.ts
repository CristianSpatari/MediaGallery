import { atom } from "recoil";
import { MediaItem } from "../../ui/utils/types";

export const selectedFolderState = atom<MediaItem[]>({
  key: "selectedMediaState",
  default: [],
});
