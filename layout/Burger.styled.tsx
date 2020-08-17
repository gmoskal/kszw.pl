import styled from "styled-components";

export const StyledBurger = styled.button<{ isExpanded: boolean }>`
  position: absolute;
  top: 50px;
  right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 2rem;
    height: 2px;
    background: ${(p) =>
      p.isExpanded ? p.theme.primaryWhite : p.theme.primaryBlack};
    border-radius: 2px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 0.62rem;

    :first-child {
      transform: ${({ isExpanded }) =>
        isExpanded ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      transform: ${(p) => (p.isExpanded ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
