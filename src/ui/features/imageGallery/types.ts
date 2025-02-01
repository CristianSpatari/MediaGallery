import { MediaItem, TMediaType } from "../../utils/types";

export interface OverlayProps {
  type: TMediaType;
}

export interface ImageGalleryProps {
  images: MediaItem[];
  onToggle: any;
}

export interface MediaProps {
  alt: string;
  src: string;
  type: TMediaType;
}

export interface ResizeMediaProps {
  id: string;
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
