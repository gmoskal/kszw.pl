import Head from "next/head";
import Link from "next/link";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";
import { hexToHpluv, hsluvToRgb } from "hsluv";

const toCSSRgb = (cs: [number, number, number]) =>
  `rgb(${cs.map((c) => Math.round(c * 255)).join(", ")})`;

export type ColorParam = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
type ColorFn = (v: keyof typeof theme, p: ColorParam) => string;

const withLightness = (t: typeof theme): ColorFn => (v, l) => {
  const [h, s] = hexToHpluv(t[v]);
  return toCSSRgb(hsluvToRgb([h, s, l]));
};

const withSaturation = (t: typeof theme): ColorFn => (v, s) => {
  const [h, _, l] = hexToHpluv(t[v]);
  return toCSSRgb(hsluvToRgb([h, s, l]));
};

const theme = {
  bgColor: "#f2eff2",
  primaryWhite: "#f2f2f2",
  primaryBlack: "#000",
  primaryHover: "#343078",
  brandColor: "#dda608",
};

declare module "styled-components" {
  export interface DefaultTheme extends DT {}
}
type DT = typeof theme & {
  withLightness: ColorFn;
  withSaturation: ColorFn;
};

export const GlobalStyle = createGlobalStyle`
  html {
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
  }
body {
	display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.primaryWhite};
    color: ${({ theme }) => theme.primaryBlack};
    height: 100vh;
    text-rendering: optimizeLegibility;
	font-family: 'Montserrat', sans-serif;
}
  *,
  *::before,
  *::after {
	  outline: none;
    box-sizing: inherit;
  }

h1 {
    font-size: 72px;
}
`;

export const BigTitle = styled.h1`
  color: black;
  line-height: 95%;
  margin: 0px;
  letter-spacing: -0.04em;
  opacity: 1;
  transform: translateY(0px);
`;

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&display=swap');
        </style>
      </Head>
      <ThemeProvider
        theme={{
          ...theme,
          withLightness: withLightness(theme),
          withSaturation: withSaturation(theme),
        }}
      >
        <GlobalStyle />
        <main>{children}</main>
        {!home && (
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        )}
      </ThemeProvider>
    </>
  );
}
