import Head from "next/head";
import { init, ColorFn } from "../utils/colors";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const colors = {
  bgColor: "#f2eff2",
  primaryWhite: "#f2f2f2",
  primaryBlack: "#000",
  primaryHover: "#343078",
  brandColor: "#dda608",
};
type Colors = typeof colors;
declare module "styled-components" {
  export interface DefaultTheme extends DT {}
}
const { withLightness, withSaturation } = init<Colors>();

type DT = typeof colors & {
  withLightness: ColorFn<Colors>;
  withSaturation: ColorFn<Colors>;
};

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
