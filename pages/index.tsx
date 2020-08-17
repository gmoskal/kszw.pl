import * as React from "react";
import styled from "styled-components";
import Layout from "../Components/Layout";
import FocusLock from "react-focus-lock";

import { useOnClickOutside } from "../utils/hooks";
import { Burger } from "../Components/Burger";
import { Menu } from "../Components/Menu";

const Title = styled.h1`
  margin-top: -200px;
  max-width: 700px;
  font-size: 60px;
  font-weight: 500;
  b {
    font-weight: 900;
  }
`;

const Content = styled.div`
  max-width: 700px;
`;

const Home = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const node = React.useRef();

  useOnClickOutside(node, () => setIsExpanded(false));

  return (
    <Layout home>
      <div ref={node as any}>
        <FocusLock disabled={!isExpanded}>
          <Burger
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            aria-controls="main-menu"
          />
          <Menu isExpanded={isExpanded} />
        </FocusLock>
      </div>
      <Content>
        <Title>
          Kancelaria Radców Prawnych
          <br />
          <b>Szalbot & Zieliński</b>
        </Title>
        <p>
          Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida.
        </p>
      </Content>
    </Layout>
  );
};

export default Home;
