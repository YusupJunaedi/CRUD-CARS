import React, { useState } from 'react'
import { Container, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarCreator } from "../../redux/actions/actionCar";

function FormEditData({ changeOpen, setOpenNotif }) {

    const formEdit = useSelector(state => state.car.editData)

    const [form, setForm] = useState(formEdit)

    console.log(form);

    const dispatch = useDispatch()

    const handleClickOpenNotif = () => {
        setOpenNotif(true);
    };

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

        if (typeof form.gambar === 'object') formData.append("gambar", form.gambar);

        formData.append("produsen", form.produsen);
        formData.append("nama", form.nama);
        formData.append("harga", form.harga);
        formData.append("mesin", form.mesin);
        formData.append("tenaga", form.tenaga);
        formData.append("tempat_duduk", form.tempat_duduk);
        formData.append("jenis_transmisi", form.jenis_transmisi);

        const configHeader = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const URL = `http://localhost:8000/post/${form._id}`;
        Axios.patch(URL, formData, configHeader).then((res) => {
            handleClickOpenNotif()
            dispatch(getAllCarCreator())
            changeOpen(false)
        })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <div className="form">
            <Container>
                <form onSubmit={addData}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Produsen"
                                name="produsen"
                                variant="outlined"
                                value={form.produsen}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nama"
                                name="nama"
                                variant="outlined"
                                value={form.nama}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
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
                                label="Tempat Duduk"
                                name="tempat_duduk"
                                type='number'
                                variant="outlined"
                                value={form.tempat_duduk}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Jenis Transmisi</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="jenis_transmisi"
                                    value={form.jenis_transmisi}
                                    onChange={handleInputChange}
                                    label="Age"
                                >
                                    <MenuItem value="Manual">Manual</MenuItem>
                                    <MenuItem value="Otomatis">Otomatis</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="file"
                                name="gambar"
                                variant="outlined"
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

export default FormEditData
