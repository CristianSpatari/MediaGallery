import { atom } from "recoil";
import { Folder } from "../../ui/utils/types";

export const folderStateAtom = atom<Folder[]>({
  key: "folderStateAtom",
  default: { selected: "1", media: [] },
});
