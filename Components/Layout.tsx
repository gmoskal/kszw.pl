import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { hexToHpluv, hsluvToRgb } from "hsluv";

const toCSSRgb = (cs: [number, number, number]) =>
  `rgb(${cs.map((c) => Math.round(c * 255)).join(", ")})`;

export type ColorParam = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
type ColorFn = (v: keyof typeof colors, p: ColorParam) => string;

const withLightness = (t: typeof colors): ColorFn => (v, l) => {
  const [h, s] = hexToHpluv(t[v]);
  return toCSSRgb(hsluvToRgb([h, s, l]));
};

const withSaturation = (t: typeof colors): ColorFn => (v, s) => {
  const [h, _, l] = hexToHpluv(t[v]);
  return toCSSRgb(hsluvToRgb([h, s, l]));
};

const colors = {
  bgColor: "#f2eff2",
  primaryWhite: "#f2f2f2",
  primaryBlack: "#000",
  primaryHover: "#343078",
  brandColor: "#dda608",
};

declare module "styled-components" {
  export interface DefaultTheme extends DT {}
}
type DT = typeof colors & { withLightness: ColorFn; withSaturation: ColorFn };

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

type LayoutProps = { children: React.ReactNode; home?: boolean };

const Layout: React.FC<LayoutProps> = (p) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="" />
      <meta name="og:title" content="Kancelaria" />
      <meta name="twitter:card" content="summary_large_image" />
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&display=swap');
      </style>
    </Head>

    <ThemeProvider
      theme={{
        ...colors,
        withLightness: withLightness(colors),
        withSaturation: withSaturation(colors),
      }}
    >
      <GlobalStyle />
      <main>{p.children}</main>
    </ThemeProvider>
  </>
);

export default Layout;
