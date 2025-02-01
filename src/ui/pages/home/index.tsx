import "./index.css";
import { Sidebar } from "../../widget/sidebar";
import { Frame } from "../../widget";
import { Flex } from "../../shared";
import { useState } from "react";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { getLocalStorage } from "../../utils/localStorageUtils";
import { ELocalStorageKey } from "../../utils/enum";
import { useMoveMedia } from "../../hooks/moveMediaHook";

export const HomePage = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const [dataFetched, setDataFetched] = useState(false);
  const [clearSelectedMedia, setClearSelectedMedia] = useState(false);
  const sensors = useSensors(mouseSensor);
  const selectedFolderID = getLocalStorage(ELocalStorageKey.SELECTED_FOLDER);
  const moveMedia = useMoveMedia();

  const resetClearSelectedMedia = () => {
    setClearSelectedMedia(true);
    setTimeout(() => setClearSelectedMedia(false), 0);
  };

  const handleDragStart = () => {
    resetClearSelectedMedia();
  };

  const handleDragEnd = async (event) => {
    const { over, active } = event;

    if (over && over.id !== selectedFolderID) {
      await moveMedia([active.id], over.id);
      resetClearSelectedMedia();
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Flex className="h-screen flex">
        <Sidebar isDataFetched={dataFetched} />
        <Frame
          onDataFetched={setDataFetched}
          clearSelectedMedia={clearSelectedMedia}
        />
      </Flex>
    </DndContext>
  );
};
