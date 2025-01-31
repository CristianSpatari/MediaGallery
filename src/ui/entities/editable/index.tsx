import { useState } from "react";
import { useRecoilState } from "recoil";
import { mediaStateAtom } from "../../../store";
import { updateLabelInStore } from "../../../db/indexDB";

export const EditableText = ({ label, extension, mediaId }) => {
  const [, setMedia] = useRecoilState(mediaStateAtom);
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(`${label}.${extension}`);

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = async () => {
    setIsEditable(false);
    await updateData();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setIsEditable(false);
      await updateData();
    }
  };

  const updateData = async () => {
    setMedia((prevMedia) =>
      prevMedia.map((item) =>
        item.id === mediaId ? { ...item, label: value.split(".")[0] } : item,
      ),
    );

    try {
      await updateLabelInStore("media", mediaId, value.split(".")[0]);
      console.log("Label updated in IndexedDB successfully.");
    } catch (error) {
      console.error("Error updating label in IndexedDB:", error);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div onClick={handleClick}>
      {isEditable ? (
        <input
          type="text"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="text-xs"
        />
      ) : (
        <div className="text-xs">{value}</div>
      )}
    </div>
  );
};
