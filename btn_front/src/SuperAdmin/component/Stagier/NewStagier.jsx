import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";

import React, { useState, useEffect } from 'react';
import { Conncetion } from "../../../ServerConection/conction";

const CeartStagier = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [DataService, SetDataService] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        Telephone: '',
        etablissement: '',
        CIN: '',
        Vill: '',
        date_debut: '',
        date_fin: '',
        service: '',
        file: null,
    });

    const GetDataService = async () => {
        const res = await Conncetion.get('/services');
        SetDataService(res.data);
    };

    useEffect(() => {
        GetDataService();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = new FormData();
        for (const key in formData) {
            userData.append(key, formData[key]);
        }

        try {
            await Conncetion.post('/trainees', userData);
            console.log('User created successfully!');
            handleOpen();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleSelect = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            service: e,
        }));
    };

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                New Stagiaire
            </Button>
            <Dialog open={open} onClose={handleOpen}>
                <form onSubmit={handleSubmit}>

                    <DialogHeader>Create Stagiaire</DialogHeader>
                    <DialogBody className="space-y-2">
                        <Input type="text" name="name" label="Name" className="mr-2" onChange={handleChange} />
                        <Input type="text" name="surname" label="Surname" className="mr-2" onChange={handleChange} />
                        <Input type="email" name="email" label="Email" className="mr-2" onChange={handleChange} />
                        <Input type="tele" name="Telephone" label="Telephone" className="mr-2" onChange={handleChange} />
                        <Input type="text" name="etablissement" label="Etablissement" className="mr-2" onChange={handleChange} />
                        <Input type="text" name="CIN" label="CIN" className="mr-2" onChange={handleChange} />
                        <Input type="text" name="Vill" label="Ville" className="mr-2" onChange={handleChange} />
                        <Input type="date" name="date_debut" label="Date début" className="mr-2" onChange={handleChange} />
                        <Input type="date" name="date_fin" label="Date fin" className="mr-2" onChange={handleChange} />
                        <Select label="Select Service" onChange={handleSelect}>
                            {DataService.map(({ name, status, id }) => (
                                <Option key={id} value={name}>{name} . {status}</Option>
                            ))}
                        </Select>
                        <Input type="file" name="file" className="mr-2" onChange={handleFileChange} />
                    </DialogBody>
                    <DialogFooter>
                        <Button type="submit" className="h-[40px] mr-2 my-2">Submit</Button>
                        <Button variant="text" color="blue" onClick={handleOpen} className="mr-1">
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
};

export default CeartStagier;
