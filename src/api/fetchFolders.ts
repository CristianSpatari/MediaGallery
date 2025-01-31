import { Folder } from "../ui/utils/types";
import { mockFolderData } from "../ui/utils/mock";

export const fetchFolders = (): Promise<Folder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFolderData);
    }, 0);
  });
};
