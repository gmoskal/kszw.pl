import * as React from "react"
import { Burger } from "Components/Burger"
import { Menu } from "Components/Menu"

import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { getTheme, media } from "../utils/colors"
// import { PostData } from "../lib/posts"

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
		}

		b {
			font-weight: 900;
		}
	}
	ul {
		color: ${p => p.theme.withLightness("primaryBlack", 30)};
		li {
			margin-bottom: 2rem;
		}
    }
	main {
		max-width: 80vw;
	}
`

type LayoutProps = { children: React.ReactNode; posts?: any[] }

export const Layout: React.FC<LayoutProps> = p => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    return (
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
                {p.posts ? (
                    <div>
                        <Burger isExpanded={isExpanded} setIsExpanded={setIsExpanded} aria-controls="main-menu" />
                        <Menu isExpanded={isExpanded} posts={p.posts || []} />
                    </div>
                ) : null}

                <main>{p.children}</main>
            </ThemeProvider>
        </>
    )
}
