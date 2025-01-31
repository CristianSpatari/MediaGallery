import { TImageType } from "../../utils/types";
import { useRecoilValue } from "recoil";
import { mediaTypeCountSelector } from "../../../store";

export const determineMediaCount = (type: TImageType) => {
  const mediaCounts = useRecoilValue(mediaTypeCountSelector);
  switch (type) {
    case "gif":
      return mediaCounts.gif;
    case "video":
      return mediaCounts.video;
    case "image":
      return mediaCounts.image;
    default:
      return 0;
  }
};
