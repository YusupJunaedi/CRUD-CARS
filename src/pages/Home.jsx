import React, { useState, useEffect } from 'react'
import './Home.css'
import FormAddData from '../components/formAddData/FormAddData';
import useTable from '../components/Table/useTable';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCarCreator } from "../redux/actions/actionCar";
import { Button, Container, Paper, TableBody, TableCell, TableRow, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function Home() {

    const cars = useSelector(state => state.car.data.reverse())
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCarCreator())
    }, [])

    const headCells = [
        { id: 'produsen', label: 'Produsen' },
        { id: 'nama', label: 'Nama' },
        { id: 'harga', label: 'harga' },
        { id: 'mesin', label: 'mesin' },
        { id: 'tenaga', label: 'tenaga' },
        { id: 'tmp_duduk', label: 'Tempat Duduk' },
        { id: 'jenis_trans', label: 'Jenis Transmisi' },
        { id: 'gambar', label: 'Gambar' },
        { id: 'aksi', label: 'Aksi' },
    ]

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = useTable(cars, headCells)

    console.log(recordsAfterPaging())


    return (
        <>
            <div className="container-main">
                {/* <FormAddData /> */}
                <Paper variant='outlined' elevation={3}>
                    <div className="button-add">
                        <Button variant="contained" color="primary" size='medium' onClick={handleClickOpen}>
                            <AddIcon /> Tambah Data
                        </Button>
                    </div>
                    <div className="table">
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPaging().map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.produsen}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>{item.harga}</TableCell>
                                            <TableCell>{item.mesin} cc</TableCell>
                                            <TableCell>{item.tenaga} hp</TableCell>
                                            <TableCell>{item.tempat_duduk} kursi</TableCell>
                                            <TableCell>{item.jenis_transmisi}</TableCell>
                                            <TableCell><img src={`http://localhost:8000/images/${item.gambar}`} alt={`img ${item.nama}`} className='image-car' /></TableCell>
                                            <TableCell>
                                                <Button variant="contained" size='small' style={{ marginRight: '5px', backgroundColor: '#ffea00' }}>
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="contained" color='secondary' size='small'>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </div>
                </Paper>
            </div>
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="title-dialog"> <AddIcon style={{ fontSize: 30, color: 'white' }} /> <h3>Tambah Data</h3> </div>
                <DialogContent>
                    <FormAddData changeOpen={(value) => setOpen(value)} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Home
