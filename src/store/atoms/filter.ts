import { atom } from "recoil";
import { Filter } from "../../ui/utils/types";

export const filterStateAtom = atom<Filter>({
  key: "filterStateAtom",
  default: {
    image: true,
    gif: true,
    video: true,
  },
});
