import React, { useState, useEffect } from 'react'
import './Home.css'
import numeral from 'numeral';
import FormAddData from '../components/formAddData/FormAddData';
import FormAddDataMotor from '../components/formAddData/FormAddDataMotor';
import useTable from '../components/Table/useTable';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCarCreator, editDataCreator } from "../redux/actions/actionCar";
import { getAllMotorCreator } from "../redux/actions/actionMotor";
import { Button, Paper, TableBody, TableCell, TableRow, AppBar, Toolbar, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormEditData from '../components/formEditData/FormEditData';
import ModalDialog from '../components/Dialog/ModalDialog';
import FormDeleteData from '../components/FormDeleteData/FormDeleteData';
import Notification from '../components/notification/Notification';
import DriveEtaIcon from '@material-ui/icons/DriveEta';


function Home() {

    const cars = useSelector(state => state.car.data)
    const motors = useSelector(state => state.motor.data)

    console.log(motors)

    const [openFormAdd, setOpenFormAdd] = useState(false);
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const [openFormDelete, setOpenFormDelete] = useState(false);

    const [idDelete, setIdDelete] = useState('')

    const [openNotifAdd, setOpenNotifAdd] = useState(false);
    const [openNotifEdit, setOpenNotifEdit] = useState(false);
    const [openNotifDelete, setOpenNotifDelete] = useState(false);
    const [dataMotor, setDataMotor] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCarCreator())
        dispatch(getAllMotorCreator())
    }, [])

    const handleClickOpen = (type) => {
        if (type === 'add') {
            setOpenFormAdd(true);
        } else if (type === 'edit') {
            setOpenFormEdit(true)
        } else {
            setOpenFormDelete(true)
        }
    };

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

    const cekData = () => {
        if(dataMotor){
            return motors
        }else{
            return cars
        }
    }

    const changeHeadCells = () => {
        if(dataMotor){
            const headCellsMotor = [
                { id: 'produsen', label: 'Produsen' },
                { id: 'nama', label: 'Nama' },
                { id: 'harga', label: 'harga' },
                { id: 'mesin', label: 'mesin' },
                { id: 'gambar', label: 'Gambar' },
                { id: 'aksi', label: 'Aksi' },
            ]
            return headCellsMotor
        }else{
            const headCellsMobil = [
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
            return headCellsMobil
        }
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = useTable(cekData(), changeHeadCells())


    return (
        <>
            {/* header */}
            <AppBar>
                <Toolbar>
                    <DriveEtaIcon style={{ fontSize: 35, color: 'white', marginRight: '5px', marginLeft: '10vw' }} />
                    <Button onClick={() => setDataMotor(false)}>
                        <h3>Data Mobil</h3>
                    </Button>
                    <Button onClick={() => setDataMotor(true)}>
                        <h3>Data Motor</h3>
                    </Button>
                </Toolbar>
            </AppBar>

            <div className="container-main">
                <Paper variant='outlined' elevation={3}>

                    {/* Button Add */}
                    <div className="button-add">
                        <Button variant="contained" color="primary" size='medium' onClick={() => {
                            handleClickOpen('add')
                        }}>
                            <AddIcon /> Tambah Data
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="table">
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    dataMotor ? recordsAfterPaging().map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.produsen}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>Rp. {numeral(item.harga).format('0,0')}</TableCell>
                                            <TableCell>{numeral(item.mesin).format('0,0')} cc</TableCell>
                                            <TableCell><img src={`http://localhost:8000/images/${item.gambar}`} alt={`img ${item.nama}`} className='image-car' /></TableCell>
                                            <TableCell>
                                                <Button variant="contained" size='small' style={{ marginRight: '5px', backgroundColor: '#ffea00' }} onClick={() => {
                                                    handleClickOpen('edit')
                                                    dispatch(editDataCreator({
                                                        _id: item._id,
                                                        produsen: item.produsen,
                                                        harga: item.harga,
                                                        nama: item.nama,
                                                        mesin: item.mesin,
                                                        tenaga: item.tenaga,
                                                        tempat_duduk: item.tempat_duduk,
                                                        jenis_transmisi: item.jenis_transmisi,
                                                        gambar: item.gambar
                                                    }))
                                                }}>
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="contained" color='secondary' size='small' onClick={() => {
                                                    setIdDelete(item._id)
                                                    handleClickOpen('delete')
                                                }}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : recordsAfterPaging().map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.produsen}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>Rp. {numeral(item.harga).format('0,0')}</TableCell>
                                            <TableCell>{numeral(item.mesin).format('0,0')} cc</TableCell>
                                            <TableCell>{numeral(item.tenaga).format('0,0')} hp</TableCell>
                                            <TableCell>{item.tempat_duduk} kursi</TableCell>
                                            <TableCell>{item.jenis_transmisi}</TableCell>
                                            <TableCell><img src={`http://localhost:8000/images/${item.gambar}`} alt={`img ${item.nama}`} className='image-car' /></TableCell>
                                            <TableCell>
                                                <Button variant="contained" size='small' style={{ marginRight: '5px', backgroundColor: '#ffea00' }} onClick={() => {
                                                    handleClickOpen('edit')
                                                    dispatch(editDataCreator({
                                                        _id: item._id,
                                                        produsen: item.produsen,
                                                        harga: item.harga,
                                                        nama: item.nama,
                                                        mesin: item.mesin,
                                                        tenaga: item.tenaga,
                                                        tempat_duduk: item.tempat_duduk,
                                                        jenis_transmisi: item.jenis_transmisi,
                                                        gambar: item.gambar
                                                    }))
                                                }}>
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="contained" color='secondary' size='small' onClick={() => {
                                                    setIdDelete(item._id)
                                                    handleClickOpen('delete')
                                                }}>
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

            {/* Modal */}
            {/* <ModalDialog openDialog={openFormAdd} icon={<AddIcon style={{ fontSize: 30, color: 'white' }} />} title="Tambah Data" >
                <FormAddData changeOpen={(value) => setOpenFormAdd(value)} setOpenNotif={(value) => setOpenNotifAdd(value)} />
            </ModalDialog> */}

            <ModalDialog openDialog={openFormAdd} icon={<AddIcon style={{ fontSize: 30, color: 'white' }} />} title="Tambah Data" >
                {
                    dataMotor ? <FormAddDataMotor changeOpen={(value) => setOpenFormAdd(value)} setOpenNotif={(value) => setOpenNotifAdd(value)} /> : <FormAddData changeOpen={(value) => setOpenFormAdd(value)} setOpenNotif={(value) => setOpenNotifAdd(value)} />
                }
                
            </ModalDialog>

            <ModalDialog openDialog={openFormEdit} icon={<EditIcon style={{ fontSize: 30, color: 'white' }} />} title="Edit Data" >
                <FormEditData changeOpen={(value) => setOpenFormEdit(value)} setOpenNotif={(value) => setOpenNotifEdit(value)} />
            </ModalDialog>

            <ModalDialog openDialog={openFormDelete} color="#f50057" >
                <FormDeleteData changeOpen={(value) => setOpenFormDelete(value)} id={idDelete} setOpenNotif={(value) => setOpenNotifDelete(value)} />
            </ModalDialog>


            {/* Notification */}
            <Notification
                openNotif={openNotifAdd}
                setOpenNotif={(value) => setOpenNotifAdd(value)}
                typeColor="success"
                title="Data berhasil ditambahkan!" />
            <Notification
                openNotif={openNotifEdit}
                setOpenNotif={(value) => setOpenNotifEdit(value)}
                typeColor="success"
                title="Data berhasil diubah!" />
            <Notification
                openNotif={openNotifDelete}
                setOpenNotif={(value) => setOpenNotifDelete(value)}
                typeColor="success"
                title="Data berhasil dihapus!" />
        </>
    )
}

export default Home
