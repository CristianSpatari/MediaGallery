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
    const newLabel = value.split(".")[0];

    setMedia((prevMedia) =>
      prevMedia.map((item) =>
        item.id === mediaId ? { ...item, label: newLabel } : item,
      ),
    );

    updateLabelInStore("media", mediaId, newLabel)
      .then(() =>
        console.log(`Label updated successfully for media ID: ${mediaId}`),
      )
      .catch((error) =>
        console.error(`Failed to update label for media ID: ${mediaId}`, error),
      );
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
