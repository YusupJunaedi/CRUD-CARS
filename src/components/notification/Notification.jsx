import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

function Notification({ openNotif, setOpenNotif, typeColor, title }) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotif(false);
    };

    return (
        <Snackbar
            open={openNotif}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={typeColor}>
                {title}
            </Alert>
        </Snackbar>
    )
}

export default Notification
