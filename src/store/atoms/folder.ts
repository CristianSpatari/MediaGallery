import { atom } from "recoil";
import { Folder } from "../../ui/utils/types";

export const folderStateAtom = atom<Folder[]>({
  key: "folderStateAtom",
  default: {
    selectedId: "",
    media: [],
  },
});
