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
    <Layout menu={p.menu} selectedTitle="Home">
        <Content>
            <Title>
                Kancelaria Radców Prawnych
                <br />
                <b>Szalbot & Zieliński</b>
            </Title>
            <p>
                Kancelaria Radców Prawnych <b>Szalbot & Zieliński</b> jest firmą prawniczą świadczącą profesjonalne
                usługi prawne, doradcze oraz szkoleniowe. Naszymi podstawowymi kierunkami działań jest świadczenie
                bieżącej pomocy prawnej polskim i zagranicznym podmiotom gospodarczym w zakresie: transportu, spedycji,
                logistyki (TSL) oraz obsługi korporacyjnej spółek prawa handlowego.
            </p>
        </Content>
    </Layout>
)

export const getStaticProps: GetStaticProps = async () => ({ props: { menu: getMenu() } })

export default Home
