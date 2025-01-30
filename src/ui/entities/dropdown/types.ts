interface Common {
  label: string;
}

interface Item extends Common {
  id: string;
}

export interface Props extends Common {
  items: Item[];
  selected: string;
}
