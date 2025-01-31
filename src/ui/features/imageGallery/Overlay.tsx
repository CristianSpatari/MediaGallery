import { BsFillPlayCircleFill } from "react-icons/bs";
import { PiGif } from "react-icons/pi";
import { OverlayProps } from "./types";
import { EMediaType } from "../../utils/enum";

export const Overlay = ({ type }: OverlayProps) => {
  if (type === EMediaType.IMAGE) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {type === EMediaType.GIF ? (
        <PiGif color="white" size="30" />
      ) : (
        <BsFillPlayCircleFill color="white" size="30" />
      )}
    </div>
  );
};
