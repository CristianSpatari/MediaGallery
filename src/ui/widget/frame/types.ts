export interface HeaderProps {
  disabled: boolean;
  checked: boolean;
  isSelected: boolean;
  selectedValue: number;
  onFolderId: (id: string) => void;
  onClick: VoidFunction;
}

export interface FrameProps {
  onDataFetched: (fetched: boolean) => void;
}
