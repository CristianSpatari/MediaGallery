import { selector } from "recoil";
import { mediaStateAtom } from "../atoms/media";
import { EMediaType } from "../../ui/utils/enum";

export const mediaTypeCountSelector = selector({
  key: "mediaTypeCountSelector",
  get: ({ get }) => {
    const media = get(mediaStateAtom);

    const count = {
      image: 0,
      gif: 0,
      video: 0,
    };

    media.forEach((item) => {
      if (item.type === EMediaType.IMAGE) {
        count.image += 1;
      } else if (item.type === EMediaType.GIF) {
        count.gif += 1;
      } else if (item.type === EMediaType.VIDEO) {
        count.video += 1;
      }
    });

    return count;
  },
});
