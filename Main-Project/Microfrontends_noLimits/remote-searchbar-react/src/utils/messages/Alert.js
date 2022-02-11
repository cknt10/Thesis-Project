import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = ((props, ref) => {

    // const [open, setOpen] = useState<boolean>(false);
    // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if(reason === "clickaway") return;
        setOpen(false);
    };

    useEffect(() => {

        if(props.message){
            setOpen(true);
        }
    }, [props.message]);

    return (
        // @ts-ignore
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <MuiAlert severity={props.type} elevation={6} ref={ref} variant="filled" {...props}>
                {props.message}
            </MuiAlert>
        </Snackbar>
    );
});

export default Alert;