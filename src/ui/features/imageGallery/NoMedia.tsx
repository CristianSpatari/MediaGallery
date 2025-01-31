import { ReactElement } from "react";
import { Avatar, Text } from "../../shared";
import noMedia from "../../shared/assets/noMedia.svg";

export const NoMedia = (): ReactElement => (
  <div className="h-[90vh] flex flex-col justify-center items-center rounded-lg border-gray-200 border-dashed border-1 bg-slate-50">
    <Avatar src={noMedia} fallback={"Media not found"} />
    <Text className="text-[24px] mt-4">This folder is empty</Text>
    <Text className="text-[14px] mt-1  text-gray-400">
      Add images, video and GIFs.
    </Text>
  </div>
);
