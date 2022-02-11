import React from 'react';
import { Container as MuiContainer } from '@mui/material';

// const Container: React.FC = ({ children }) => {
const Container = ({ children }) => {
    return (
        <MuiContainer maxWidth="lg">
            { children }
        </MuiContainer>
    );
}

export default Container;