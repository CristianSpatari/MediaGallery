import { ReactElement } from "react";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProps as Props } from "./types";

export const Theme = (props: Props): ReactElement => <RadixTheme {...props} />;
