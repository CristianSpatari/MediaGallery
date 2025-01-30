import { ReactElement } from "react";
import { TextProps as Props } from "./types";
import { Text as RadixText } from "@radix-ui/themes";

export const Text = (props: Props): ReactElement => <RadixText {...props} />;
