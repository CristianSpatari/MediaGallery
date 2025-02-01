export type TMediaType = "image" | "gif" | "video";
export type TMediaExtension = "jpeg" | "png" | "gif" | "mp4";
export type TDBType = "media" | "folder";
export type TImageType = "folder" | TMediaType;

export interface Item {
  label: string;
  id: string;
  onClick: any;
  selected?: boolean;
  type: TImageType;
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
  type: TImageType;
  isChecked?: boolean;
  mediaId?: string[];
}

export interface Folder {
  media: FolderItem[];
  selectedId: string;
}

export interface Filter {
  image: boolean;
  gif: boolean;
  video: boolean;
}
