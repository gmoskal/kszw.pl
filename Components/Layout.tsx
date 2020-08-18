import * as React from "react"
import Head from "next/head"
import { init, ColorFn } from "../utils/colors"
import { createGlobalStyle, ThemeProvider } from "styled-components"

const colors = {
    bgColor: "#f2eff2",
    primaryWhite: "#f2f2f2",
    primaryBlack: "#000",
    primaryHover: "#343078",
    brandColor: "#dda608"
}

export const sizes = {
    mobileM: "375px",
    tablet: "768px",
    laptopL: "1440px",
    desktop: "2560px"
}

const { withLightness, withSaturation } = init<Colors>()
export const media = (d: keyof typeof sizes) => `@media (max-width: ${sizes[d]})`

type Colors = typeof colors
declare module "styled-components" {
    export interface DefaultTheme extends DT {}
}
type DT = typeof colors & {
    withLightness: ColorFn<Colors>
    withSaturation: ColorFn<Colors>
}

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
		color: ${p => p.theme.withLightness("primaryBlack", 50)};
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
`

type LayoutProps = { children: React.ReactNode; home?: boolean }

export const Layout: React.FC<LayoutProps> = p => (
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

        <ThemeProvider
            theme={{
                ...colors,
                withLightness: withLightness(colors),
                withSaturation: withSaturation(colors)
            }}>
            <GlobalStyle />
            <main>{p.children}</main>
        </ThemeProvider>
    </>
)
