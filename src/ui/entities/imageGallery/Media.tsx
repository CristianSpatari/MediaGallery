import { Overlay } from "./Overlay";
import { MediaProps } from "./types";

export const Media = ({ alt, src, type }: MediaProps) => (
  <div className="relative w-full pb-[100%]">
    <img
      src={src}
      alt={alt}
      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Overlay type={type} />
  </div>
);
