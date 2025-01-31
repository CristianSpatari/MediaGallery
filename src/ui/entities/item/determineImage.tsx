import { TImageType } from "../../utils/types";
import { BsFolder2Open } from "react-icons/bs";
import { PiGif, PiImageSquareThin } from "react-icons/pi";
import { VscPlay } from "react-icons/vsc";

export const determineImage = (type: TImageType) => {
  switch (type) {
    case "image":
      return <PiImageSquareThin />;
    case "gif":
      return <PiGif />;
    case "video":
      return <VscPlay />;
    default:
      return <BsFolder2Open />;
  }
};
