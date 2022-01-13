import React from 'react';
import Grid from '@mui/material/Grid';

// TODO remove any type
// const Col: React.FC<React.InputHTMLAttributes<HTMLInputElement> & any> = (props: any) => {
const Col = (props) => {
    return (
        <Grid item {...props}>
            {props.children}
        </Grid>
    );
}

export default Col;