export interface HeaderProps {
  disabled: boolean;
  checked: boolean;
  isSelected: boolean;
  selectedValue: number;
  onFolderId: (id: string) => void;
  onClick: VoidFunction;
}
