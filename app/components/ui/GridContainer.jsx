import React from 'react';
import styled from 'styled-components';

const GridContainer = ({ children }) => <Layout>{children}</Layout>;

const Layout = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-gap: 1em;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1em;

  @media (max-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 720px) {
    display: block;
    padding: 0;
  }
`;

const GridItem = styled.div`
  grid-column-end: span ${props => props.width};
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 900px) {
    grid-column-end: span 3;
  }

  @media (max-width: 720px) {
    margin-bottom: 1em;
  }
`;

export default GridContainer;
