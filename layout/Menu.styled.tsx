import styled from "styled-components";

export const StyledMenu = styled.nav<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryBlack};
  height: 100vh;
  border: 20px solid white;
  width: ${(p) => (p.isExpanded ? "100vw" : "0px")};
  text-align: left;
  padding: ${(p) => (p.isExpanded ? "2rem" : "0")};
  position: absolute;
  top: 0;
  right: 0;
  opacity: ${(p) => (p.isExpanded ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  a {
    font-size: 2rem;
    padding: 1rem 0;
    text-align: center;
    color: ${({ theme }) => theme.primaryWhite};
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
