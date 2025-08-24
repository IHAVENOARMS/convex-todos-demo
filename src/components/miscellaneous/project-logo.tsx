import * as React from "react";

export const ProjectLogo: React.FC<React.ComponentProps<"img">> = (props) => (
  <img {...props} src="/project-logo.svg" />
);
