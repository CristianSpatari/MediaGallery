import { ReactElement } from "react";
import { Avatar, Link, Text } from "../../shared";
import logo from "../../shared/assets/logo.svg";

export const Logo = (): ReactElement => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Avatar src={logo} fallback={"Media gallery logo"} />
        <Text className="ml-2">Media gallery</Text>
      </div>
    </Link>
  );
};
