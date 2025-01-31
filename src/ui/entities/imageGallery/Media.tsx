import { Overlay } from "./Overlay";
import { MediaProps } from "./types";

export const Media = ({ alt, src, type }: MediaProps) => {
  // TODO: need to add code when receive video
  // const isVideo = type === EMediaType.VIDEO;
  return (
    <div className="relative w-full pb-[100%]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Overlay type={type} />
    </div>
  );
};
