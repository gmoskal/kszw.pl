import * as React from "react"
import styled from "styled-components"
import Link from "next/link"
import { media } from "../utils/colors"

type MenuProps = { isExpanded: boolean; posts: any[] }
export const Menu: React.FC<MenuProps> = p => (
    <StyledMenu aria-hidden={!p.isExpanded} {...p}>
        <ul>
            <h2>Prawo</h2>
            {p.posts.map(pd => (
                <li key={pd.id}>
                    <Link href="/[id]" as={`/${pd.id}`}>
                        <a>{pd.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </StyledMenu>
)

const StyledMenu = styled.nav<MenuProps>`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.primaryBlack};
    height: 100vh;
    border: 1rem solid white;
    width: ${p => (p.isExpanded ? "100vw" : "0px")};
    text-align: left;
    padding: ${p => (p.isExpanded ? "2rem" : "0")};
    position: absolute;
    right: 0;
    padding-top: 30vh;
    top: 0;
    opacity: ${p => (p.isExpanded ? "1" : "0")};
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    color: ${({ theme }) => theme.primaryWhite};
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: block;
        /* margin: 0 auto; */
        align-self: center;
        li {
            margin-bottom: 0;
            ${media("mobileM")} {
                font-size: 1.2rem;
                padding: 0.4rem 0;
            }
        }
    }
    h2 {
        color: ${({ theme }) => theme.primaryWhite};
    }
    a {
        font-size: 1.2rem;
        line-height: 1.8rem;
        color: ${({ theme }) => theme.withLightness("primaryWhite", 70)};
        text-decoration: none;

        &:hover {
            color: ${({ theme }) => theme.primaryHover};
        }
        transition: color 0.3s linear;
    }
`
