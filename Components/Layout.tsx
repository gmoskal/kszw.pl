import * as React from "react"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { media, getTheme } from "../utils/colors"
import { Menu, MenuGroup } from "./Menu"

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${({ theme }) => theme.primaryWhite};
		color: ${({ theme }) => theme.primaryBlack};
		min-height: 98vh;
		text-rendering: optimizeLegibility;
		font-family: 'Montserrat', sans-serif;
		font-size: 16px;
		${media("mobileM")} {
        	font-size: 12px;
		}
		padding: 1rem;
		
	}
	*,
	*::before,
	*::after {
		outline: none;
		box-sizing: inherit;
	}
	p {
		color: ${p => p.theme.withLightness("primaryBlack", 20)};
		line-height: 1.5em;
	}

	h1 {
		font-size: 4rem;
		font-weight: 500;
		${media("mobileM")} {
			font-size: 1.5rem;
		    margin-top: .6rem;
		}

		b {
			font-weight: 900;
		}
	}
	ul {
		color: ${p => p.theme.withLightness("primaryBlack", 30)};
		${media("mobileM")} {
            padding-left: 1rem;
            padding-top: 1.2rem;
        }

		li {
			margin-bottom: 2rem;

		}
    }
	main {
		max-width: 80vw;
	}
`

export const Layout: React.FC<{ children: React.ReactNode; menu?: MenuGroup[]; selectedTitle?: string }> = p => (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="" />
            <meta name="og:title" content="Kancelaria" />
            <meta name="twitter:card" content="summary_large_image" />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;900&display=swap"
                rel="stylesheet"
            />
        </Head>
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />
            {p.menu && <Menu aria-controls="main-menu" menu={p.menu} selectedTitle={p.selectedTitle} />}
            <main>{p.children}</main>
        </ThemeProvider>
    </>
)
