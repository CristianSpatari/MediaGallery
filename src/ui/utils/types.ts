import { ReactElement } from "react";

export type TMediaType = "image" | "gif" | "video";
export type TMediaExtension = "jpeg" | "png" | "gif" | "mp4";

export interface Item {
  id: string;
  icon: ReactElement;
  label: string;
  selected?: boolean;
  count?: number;
  isCheckbox?: boolean;
}

export interface MediaItem {
  id: string;
  src: string;
  label: string;
  width: number;
  height: number;
  type: TMediaType;
  extension: TMediaExtension;
  alt?: string;
}
