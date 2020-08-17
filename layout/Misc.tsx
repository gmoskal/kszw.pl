import * as React from "react";
import { StyledBurger } from "./Burger.styled";
import { StyledMenu } from "./Menu.styled";

export const Burger: React.FC<{
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
}> = ({ setIsExpanded, ...p }) => (
  <StyledBurger
    aria-label="Toggle menu"
    aria-expanded={p.isExpanded}
    onClick={() => setIsExpanded(!p.isExpanded)}
    {...p}
  >
    <span />
    <span />
  </StyledBurger>
);

export const Menu: React.FC<{ isExpanded: boolean }> = (p) => {
  const tabIndex = p.isExpanded ? 0 : -1;
  return (
    <StyledMenu aria-hidden={!p.isExpanded} {...p}>
      <a href="/" tabIndex={tabIndex}>
        Prawo
      </a>
      <a href="/" tabIndex={tabIndex}>
        O nas
      </a>
    </StyledMenu>
  );
};

export default Menu;
