import * as React from "react"
import styled from "styled-components"
import Layout from "../Components/Layout"

import { useOnClickOutside } from "../utils/hooks"
import { Burger } from "../Components/Burger"
import { Menu } from "../Components/Menu"

const Title = styled.h1`
    margin-top: -200px;
    max-width: 700px;
`

const Content = styled.div`
    max-width: 700px;
    z-index: 1;
`

const Home = () => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const node = React.useRef()

    useOnClickOutside(node, () => setIsExpanded(false))

    return (
        <Layout home>
            <div ref={node as any}>
                <Burger isExpanded={isExpanded} setIsExpanded={setIsExpanded} aria-controls="main-menu" />
                <Menu isExpanded={isExpanded} />
            </div>
            <Content>
                <Title>
                    Kancelaria Radców Prawnych
                    <br />
                    <b>Szalbot & Zieliński</b>
                </Title>
                <p>
                    Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                </p>
            </Content>
        </Layout>
    )
}

export default Home
