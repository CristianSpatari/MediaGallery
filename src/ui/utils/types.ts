export type TMediaType = "image" | "gif" | "video";
export type TMediaExtension = "jpeg" | "png" | "gif" | "mp4";

export interface Item {
  label: string;
  onClick: any;
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

export interface FolderItem {
  id: string;
  label: string;
  mediaId: string[];
}

export interface Folder {
  media: FolderItem[];
  selected: string;
}
