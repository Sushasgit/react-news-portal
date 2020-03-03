import React from 'react';
import styled from 'styled-components';

const Button = ({ type, children, onClick, label, disabled, view }) => {
    switch (view) {
        case 'confirm':
            return (
                <ConfirmButton
                    type={type}
                    disabled={disabled}
                    onClick={onClick}>
                    {children || label}
                </ConfirmButton>
            );
        case 'base':
            return (
                <BaseButton type={type} disabled={disabled} onClick={onClick}>
                    {children || label}
                </BaseButton>
            );
        default:
            return (
                <BaseButton type={type} disabled={disabled} onClick={onClick}>
                    {children || label}
                </BaseButton>
            );
    }
};

const BaseButton = styled.button`
    border-radius: 0 2px 2px 0;
    padding: 10px;
    display: inline-block;
    border: 1px solid rgba(147, 128, 108, 0.25);
    background-color: #bdbcbc;
    font-weight: 900;
    text-transform: uppercase;
    transition: opacity 0.3s ease 0s;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`;

const ConfirmButton = styled.button`
    text-transform: uppercase;
    font-weight: 900;
    background: #fff;
    padding: 10px;
    border: 4px solid #000;
    border-radius: 6px;
    display: inline-block;
    transition: color 0.3s ease 0s;
    cursor: pointer;

    &:hover {
        background: #000;
        color: #fff;
    }
`;

export default Button;
