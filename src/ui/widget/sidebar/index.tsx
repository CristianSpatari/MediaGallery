import { Container } from "@radix-ui/themes";
import { ReactElement } from "react";
import { Logo } from "../../entities";
import { Category } from "../../features";
import { useRecoilValue } from "recoil";
import { folderStateAtom } from "../../../store";
import { mockFilterData } from "../../utils/mock";

export const Sidebar = ({
  isDataFetched,
}: {
  isDataFetched: boolean;
}): ReactElement => {
  const { media } = useRecoilValue(folderStateAtom);
  return (
    <Container className="flex-1 w-full p-4">
      <Logo />
      {isDataFetched ? (
        <div className="mt-[32px]">
          <Category label="Folders" items={media} />
          <Category label="Filters" items={mockFilterData} />
        </div>
      ) : null}
    </Container>
  );
};
