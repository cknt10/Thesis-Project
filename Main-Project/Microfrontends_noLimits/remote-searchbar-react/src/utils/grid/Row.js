import React from 'react';
import { Grid } from '@mui/material';

// const Row: React.FC = ({ children }) => {
const Row = ({ children }) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    );
}

export default Row;