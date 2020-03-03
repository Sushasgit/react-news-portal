import React from 'react';
import styled from 'styled-components';

const GridItem = ({ children, width }) => <BaseGrid width={width}>{children}</BaseGrid>;

const BaseGrid = styled.div`
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

export default GridItem;
