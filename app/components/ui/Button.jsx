import React from 'react';
import styled from 'styled-components';

const Button = ({ type, children, onClick, label }) => (
  <BaseButton type={type} onClick={onClick}>
    {children || label}
  </BaseButton>
);

const BaseButton = styled.button`
  border-radius: 0 2px 2px 0;
  padding: 10px;
  display: inline-block;
  border: 1px solid rgba(147, 128, 108, 0.25);
  background-color: #bdbcbc;
  font-weight: 900;
  text-transform: uppercase;
`;

export default Button;
