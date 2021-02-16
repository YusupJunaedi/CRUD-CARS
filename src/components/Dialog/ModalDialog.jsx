import React, { useState } from 'react'
import { Button, Container, Paper, TableBody, TableCell, TableRow, Dialog, DialogTitle, DialogContent } from '@material-ui/core';


function ModalDialog({ openDialog, children, title, icon }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = (type) => {
        setOpen(open);
    };

    const handleClose = (type) => {
        setOpen(false);
    };

    // console.log('icon => ', icon);

    return (
        <Dialog open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <div className="title-dialog"> {icon} <h3>{title}</h3> </div>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ModalDialog
