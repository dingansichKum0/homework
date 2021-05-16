import React from "react";
import { styled } from "@material-ui/styles";

const btn: React.FC<any> = ({ children, ...args }) => (
  <button {...args}>{children}</button>
);

export const Button = styled(btn)({
  background: "#FE6B8B",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  cursor: "pointer",
});
