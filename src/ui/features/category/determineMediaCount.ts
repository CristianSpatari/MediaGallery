import { TImageType } from "../../utils/types";
import { mediaTypeCountSelector } from "../../../store/selectors/selectorMediaTypeCount";
import { useRecoilValue } from "recoil";

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
