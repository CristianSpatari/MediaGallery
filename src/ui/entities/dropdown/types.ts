interface Common {
  label: string;
}

interface Item extends Common {
  id: string;
}

export interface Props extends Common {
  items: Item[];
  selectedId: string;
  onFolderId: (id: string) => void;
}
