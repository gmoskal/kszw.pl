import * as React from "react"
import styled from "styled-components"

type BurgerProps = { isExpanded: boolean; setIsExpanded: (v: boolean) => void }

export const Burger: React.FC<BurgerProps> = ({ setIsExpanded, ...p }) => (
    <StyledBurger
        aria-label="Toggle menu"
        aria-expanded={p.isExpanded}
        onClick={() => setIsExpanded(!p.isExpanded)}
        {...p}>
        <span />
        <span />
    </StyledBurger>
)

const StyledBurger = styled.button<Pick<BurgerProps, "isExpanded">>`
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
        background: ${p => (p.isExpanded ? p.theme.primaryWhite : p.theme.primaryBlack)};
        border-radius: 2px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 0.62rem;

        :first-child {
            transform: ${({ isExpanded }) => (isExpanded ? "rotate(45deg)" : "rotate(0)")};
        }

        :nth-child(2) {
            transform: ${p => (p.isExpanded ? "rotate(-45deg)" : "rotate(0)")};
        }
    }
`
