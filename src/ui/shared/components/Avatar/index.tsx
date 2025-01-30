import { ReactElement } from "react";
import { AvatarProps } from "./types";
import { Avatar as RadixAvatar } from "@radix-ui/themes";

export const Avatar = (props: AvatarProps): ReactElement => (
  <RadixAvatar {...props} />
);
