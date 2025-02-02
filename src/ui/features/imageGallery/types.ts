import { MediaItem, TMediaType } from "../../utils/types";

export interface OverlayProps {
  type: TMediaType;
}

interface ImageCommon {
  selectedMedia: string[];
  onToggle: (id: string) => void;
  onDeletedImage: (deleteImage: boolean) => void;
}

export interface ImageProps extends ImageCommon {
  image: MediaItem;
}

export interface ImageGalleryProps extends ImageCommon {
  images: MediaItem[];
}

export interface MediaProps {
  alt: string;
  src: string;
  type: TMediaType;
}

export interface ActionProps {
  id: string;
  onDeletedImage?: (deleteImage: boolean) => void;
  mediaLabel?: string;
}

export interface CheckBoxNumberProps {
  isChecked: boolean;
  index: number | null;
}

export interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onHandlePageChange: (newPage: number) => void;
}
