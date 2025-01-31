import "./index.css";
import { Sidebar } from "../../widget/sidebar";
import { Frame } from "../../widget";
import { Flex } from "../../shared";
import { useState } from "react";

export const HomePage = () => {
  const [dataFetched, setDataFetched] = useState(false);
  return (
    <Flex className="h-screen flex">
      <Sidebar isDataFetched={dataFetched} />
      <Frame onDataFetched={setDataFetched} />
    </Flex>
  );
};
