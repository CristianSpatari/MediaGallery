import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "../ui/pages";
import { RecoilRoot } from "recoil";
import { Theme } from "../ui/shared";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <Theme>
        <HomePage />
      </Theme>
    </RecoilRoot>
  </StrictMode>,
);
