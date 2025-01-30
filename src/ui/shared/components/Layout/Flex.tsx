import { ReactElement } from "react";
import { Flex as RadixFlex } from "@radix-ui/themes";
import { FlexProps as Props } from "./types";

export const Flex = (props: Props): ReactElement => <RadixFlex {...props} />;
