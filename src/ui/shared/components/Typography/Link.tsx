import { ReactElement } from "react";
import { Link as RadixLink } from "@radix-ui/themes";
import { LinkProps as Props } from "./types";

export const Link = (props: Props): ReactElement => <RadixLink {...props} />;
