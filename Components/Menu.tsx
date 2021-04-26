import * as React from "react"
import styled from "styled-components"
import Link from "next/link"
import { media } from "../utils/colors"

type MenuItem = { href: string; as?: string; title: string }
export type MenuGroup = { title: string; items: Array<MenuItem> }

type MenuProps = { menu: MenuGroup[]; selectedTitle?: string; isExpanded: boolean; setIsExpanded: (v: boolean) => void }
export const Menu: React.FC<MenuProps> = ({ isExpanded, setIsExpanded, ...p }) => (
    <div>
        <StyledMenu aria-hidden={!isExpanded} isExpanded={isExpanded}>
            {p.menu.map((g, i) => (
                <ul key={i}>
                    <h2>{g.title}</h2>
                    {(g.items || []).map((item, i2) => (
                        <li key={`${i}-${i2}`}>
                            <Link href={item.href} as={item.as}>
                                <A isExpanded={isExpanded} isSelected={p.selectedTitle === item.title}>
                                    {item.title}
                                </A>
                            </Link>
                        </li>
                    ))}
                </ul>
            ))}
        </StyledMenu>
        <StyledBurger
            aria-label="Toggle menu"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}>
            <span />
            <span />
        </StyledBurger>
    </div>
)

const A = styled.a<{ isSelected: boolean; isExpanded: boolean }>`
    transition: color 0.3s linear;

    color: ${({ theme, ...p }) =>
        p.isExpanded ? (p.isSelected ? theme.brandColor : theme.withLightness("primaryWhite", 70)) : "transparent"};
    line-height: 2rem;
    font-size: 1.2rem;

    ${media("mobileM")} {
        font-size: 0.9rem;
        line-height: 1.2rem;
    }

    &:hover {
        color: ${({ theme }) => theme.primaryHover};
        cursor: pointer;
    }
`

const StyledMenu = styled.nav<{ isExpanded: boolean }>`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.primaryBlack};
    height: calc(100vh - 2rem);
    border: 1rem solid transparent;
    margin-top: 1rem;

    width: ${p => (p.isExpanded ? "100%" : "0px")};
    margin-right: ${p => (p.isExpanded ? "1rem" : "-500px")};
    max-width: 500px;
    text-align: left;
    padding: 2rem;
    position: fixed;
    right: 0;
    padding-top: 30vh;
    top: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    color: ${p => (p.isExpanded ? p.theme.primaryWhite : "transparent")};
    padding-left: ${p => (p.isExpanded ? "4rem" : "0")};
    border-left-width: ${p => (p.isExpanded ? "1rem" : "0")};
    border-right-width: ${p => (p.isExpanded ? "1rem" : "0")};

    ${media("mobileM")} {
        height: 110vh;
        margin-top: 0;
        margin-right: ${p => (p.isExpanded ? "0rem" : "-500px")};
        max-width: 110vw;
        width: 110vw;
        padding-left: ${p => (p.isExpanded ? "18vw" : "0")};
        border: 0.5rem solid transparent;
        border-width: ${p => (p.isExpanded ? ".5rem" : ".5rem")};
        right: ${p => (p.isExpanded ? 0 : "-2rem")};
        border: none;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: block;
        li {
            margin-bottom: 0;
            ${media("mobileM")} {
                font-size: 1rem;
                padding: 0.4rem 0;
            }
        }
    }
    h2 {
        transition: all 0.4s ease-in-out;
        color: ${({ theme, isExpanded }) => (isExpanded ? theme.primaryWhite : "transparent")};
    }
`

const StyledBurger = styled.button<{ isExpanded: boolean }>`
    position: absolute;
    position: fixed;
    top: 3rem;
    right: 3rem;
    ${media("mobileM")} {
        top: 2.5rem;
        right: 2rem;
    }
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
