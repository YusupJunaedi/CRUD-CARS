import React from 'react'
import Axios from 'axios';
import { Button, Container, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getAllCarCreator } from "../../redux/actions/actionCar";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Notification from '../notification/Notification';

function FormDeleteData({ changeOpen, id, setOpenNotif }) {

    const handleClickOpenNotif = () => {
        setOpenNotif(true);
    };


    const dispatch = useDispatch()

    const deleteData = (e) => {
        e.preventDefault()

        const URL = `http://localhost:8000/post/${id}`;
        Axios.delete(URL).then((res) => {
            handleClickOpenNotif()
            dispatch(getAllCarCreator())
            changeOpen(false)
        });

    }

    return (
        <>
            <div className="form">
                <Container>
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                        <NotListedLocationIcon style={{ fontSize: 200, color: '#f50057' }} />
                        <h3>Apakah anda yakin menghapus data ini ?</h3>
                    </Box>
                    <div className="btn-group">
                        <Button variant="contained" color="primary" size="large" type="submit" className="btn-form" onClick={deleteData}>
                            Hapus
                    </Button>
                        <Button variant="contained" color='default' size="large" className="btn-form" onClick={() => changeOpen(false)}>
                            Batal
                    </Button>
                    </div>

                </Container>
            </div>
        </>
    )
}

export default FormDeleteData
