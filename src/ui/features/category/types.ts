import { FolderItem } from "../../utils/types";

export interface Props {
  label: string;
  items: FolderItem[];
}

export interface CollapseProps {
  onClick: VoidFunction;
  isFilterOpen: boolean;
}
