import * as React from "react"
import styled from "styled-components"

import { Layout } from "Components/Layout"
import { GetStaticProps } from "next"
import { getMenu } from "lib/files"
import { MenuGroup } from "../Components/Menu"

const Title = styled.h1`
    margin-top: -200px;
    max-width: 700px;
`

const Content = styled.div`
    max-width: 700px;
    z-index: 1;
`

const Home: React.FC<{ menu: MenuGroup[] }> = p => (
    <Layout menu={p.menu}>
        <Content>
            <Title>
                Kancelaria Radców Prawnych
                <br />
                <b>Szalbot & Zieliński</b>
            </Title>
            <p>
                Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
            </p>
        </Content>
    </Layout>
)

export const getStaticProps: GetStaticProps = async () => ({ props: { menu: getMenu() } })

export default Home
