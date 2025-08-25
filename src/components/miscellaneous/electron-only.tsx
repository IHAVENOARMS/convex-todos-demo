import { isInElectron } from "@/utils/is-in-electron";
import { PropsWithChildren } from "react";

export const ElectronOnly = ({ children }: PropsWithChildren) => {
  return <>{isInElectron(window) && children}</>;
};
