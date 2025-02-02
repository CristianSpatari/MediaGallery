import { ActionProps } from "./types";
import { PiTrashLight } from "react-icons/pi";
import { deleteMediaById, removeMediaFromFolder } from "../../../db/indexDB";
import { useRecoilState } from "recoil";
import { folderStateAtom, mediaStateAtom } from "../../../store";
import { getLocalStorage } from "../../utils/localStorageUtils";
import { ELocalStorageKey } from "../../utils/enum";

export const Trash = ({ id, mediaLabel, onDeletedImage }: ActionProps) => {
  const folderId = getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);

  const [, setMedia] = useRecoilState(mediaStateAtom);
  const [, setFolder] = useRecoilState(folderStateAtom);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete media: ${mediaLabel}?`,
    );

    if (isConfirmed) {
      try {
        await removeMediaFromFolder(folderId ?? "200", [id]);
        await deleteMediaById(id);
        setMedia((prevMedia) => prevMedia.filter((item) => item.id !== id));
        setFolder((prevFolder) => {
          const media = prevFolder.media.map((el) => {
            if (el.mediaId.includes(id)) {
              return { ...el, mediaId: el.mediaId.filter((i) => i !== id) };
            } else {
              return el;
            }
          });
          return { ...prevFolder, media };
        });
        if (onDeletedImage) {
          onDeletedImage(true);
        }

        console.log(`Successfully deleted item with ID: ${id}`);
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  return (
    <div
      onClick={handleDelete}
      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <PiTrashLight color="white" size="23" />
    </div>
  );
};
