import "./index.css";
import { Sidebar } from "../../widget/sidebar";
import { Frame } from "../../widget";
import { Flex } from "../../shared";

export const HomePage = () => {
  return (
    <Flex className="h-screen flex">
      <Sidebar />
      <Frame />
    </Flex>
  );
};
