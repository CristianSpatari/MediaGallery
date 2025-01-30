import { Container } from "@radix-ui/themes";
import { ReactElement } from "react";
import { Logo } from "../../entities";
import { Category } from "../../features";
import { mockFolderData } from "../../utils/mock";

export const Sidebar = (): ReactElement => {
  return (
    <Container className="flex-1 w-full p-4">
      <Logo />
      <Category label="Folders" items={mockFolderData} />
      {/*<Category label="Filters" items={filterItems} />*/}
    </Container>
  );
};
