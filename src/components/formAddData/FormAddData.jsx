import React, { useEffect, useState } from 'react'
import { Container, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import Axios from 'axios';
import './FormAddData.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarCreator } from "../../redux/actions/actionCar";


function FormAddData({ changeOpen, setOpenNotif }) {

    const handleClickOpenNotif = () => {
        setOpenNotif(true);
    };

    const [form, setForm] = useState({
        produsen: '',
        nama: '',
        harga: '',
        mesin: '',
        tenaga: '',
        tmp_duduk: '',
        jenis_trans: '',
        gambar: []
    })

    const dispatch = useDispatch()


    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'gambar') {
            setForm({
                ...form,
                gambar: files[0]
            })
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
    }

    const addData = (e) => {
        e.preventDefault()

        let formData = new FormData();
        formData.append("produsen", form.produsen);
        formData.append("nama", form.nama);
        formData.append("harga", form.harga);
        formData.append("mesin", form.mesin);
        formData.append("tenaga", form.tenaga);
        formData.append("tempat_duduk", form.tmp_duduk);
        formData.append("jenis_transmisi", form.jenis_trans);
        formData.append("gambar", form.gambar);

        const configHeader = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        const URL = `http://localhost:8000/car/`;
        Axios.post(URL, formData, configHeader).then((res) => {
            dispatch(getAllCarCreator())
            changeOpen(false)
            handleClickOpenNotif()
        })
            .catch(err => {
                console.log('error => ', err);
            })

    }

    return (
        <div className="form">
            <Container>
                <form onSubmit={addData} autoComplete='off'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Produsen"
                                name="produsen"
                                variant="outlined"
                                value={form.produsen}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Nama"
                                name="nama"
                                variant="outlined"
                                value={form.nama}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Harga"
                                name="harga"
                                type='number'
                                variant="outlined"
                                value={form.harga}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Mesin"
                                name="mesin"
                                type='number'
                                variant="outlined"
                                value={form.mesin}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Tenaga"
                                name="tenaga"
                                type='number'
                                variant="outlined"
                                value={form.tenaga}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Tempat Duduk"
                                name="tmp_duduk"
                                type='number'
                                variant="outlined"
                                value={form.tmp_duduk}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Jenis Transmisi</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="jenis_trans"
                                    value={form.jenis_trans}
                                    onChange={handleInputChange}
                                    label="Age"
                                >
                                    <MenuItem value="CVT">CVT</MenuItem>
                                    <MenuItem value="Manual">Manual</MenuItem>
                                    <MenuItem value="Otomatis">Otomatis</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Gambar</label>
                            <TextField
                                required
                                type="file"
                                name="gambar"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className="btn-group">
                                <Button variant="contained" color="primary" size="large" type="submit" className="btn-form">
                                    Simpan
                            </Button>
                                <Button variant="contained" color='default' size="large" className="btn-form" onClick={() => changeOpen(false)}>
                                    Batal
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}

export default FormAddData
