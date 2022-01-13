import React from 'react';
import Box from '@mui/material/Box';

// const Container: React.FC = ({ children }) => {
const Container = ({ children }) => {
    return (
        <Box 
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            { children }
        </Box>
    );
}

export default Container;