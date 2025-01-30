import { CgArrowsExpandLeft } from "react-icons/cg";
import { ReactElement } from "react";
import { ResizeMediaProps } from "./types";

export const ResizeMedia = ({ id }: ResizeMediaProps): ReactElement => (
  <div
    onClick={() => console.log(`Resize media id: ${id}`)}
    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    <CgArrowsExpandLeft color="white" size="13" />
  </div>
);
