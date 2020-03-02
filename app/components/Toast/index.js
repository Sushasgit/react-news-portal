import React, { Fragment } from 'react';
import styled from 'styled-components';

const ToastWrap = styled.div`
  position: fixed;
  z-index: 1000;
  right: 20px;
  top: 20px;
  background: #fff;
  padding: 10px 40px;
  border: none;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  &:before {
    content: '';
    border-right: 5px solid #20bf6b;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  font-weight: 900;
  background: #ffffff;
  padding: 10px;
  border: 4px solid #20bf6b !important;
  border-radius: 6px;
  display: inline-block;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #494949 !important;
    border-radius: 50px;
    border-color: #494949 !important;
    transition: all 0.3s ease 0s;
  }
`;

function Toast({ undoChanges }) {
  return (
    <Fragment>
      <ToastWrap>
        <h3>You can restore changes</h3>
        <Button onClick={() => undoChanges()}>Undo</Button>
      </ToastWrap>
    </Fragment>
  );
}

export default Toast;
