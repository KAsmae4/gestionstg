
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
    Select,
    Input,
    Option,
} from "@material-tailwind/react";

import React, {useEffect, useState } from 'react';
import { Conncetion } from "../../../ServerConection/conction";

const CeartStagier = () => {
    const [DataService, SetDataService] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        Telephone: '',
        etablissement: '',
        cin: '',
        ville:'',
        date_debut:'',
        date_fin:'',
        service:'',
        file: null,
    });
    const GetDataService = async _ => {
        const res = await Conncetion.get('/services')
        SetDataService(res.data)
      }
      useEffect(() => {
        GetDataService()
      }, []) 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.append('name', formData.name);
        userData.append('surname', formData.surname);
        userData.append('email', formData.email);
        userData.append('Telephone', formData.Telephone);
        userData.append('etablissement', formData.etablissement);
        userData.append('cin', formData.cin);
        userData.append('ville', formData.ville);
        userData.append('date_debut', formData.date_debut);
        userData.append('date_fin', formData.date_fin);
       
        userData.append('file', formData.file);

        try {

            await Conncetion.post('/trainees', userData);
            console.log('User created successfully!');
            handleClose();

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
                new stagier
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}  >

                    <DialogHeader>Create Stagiaire</DialogHeader>
                    <DialogBody className="space-y-2 " >

                        <Input type="text" name="name" label="Name" className=" mr-2" onChange={handleChange} />


                        <Input type="text" name="surname" label="Surname" className=" mr-2" onChange={handleChange} />



                        <Input type="email" name="email" label="Email" className=" mr-2" onChange={handleChange} />


                        <Input type="text" name="Telephone" label="Telephone" className=" mr-2" onChange={handleChange} />


                        <Input type="text" name="etablissement" label="etablissement" className=" mr-2" onChange={handleChange} />


                        <Input type="text" name="cin" label="CIN" className=" mr-2" onChange={handleChange} />

                        <Input type="text" name="ville" label="Ville" className=" mr-2" onChange={handleChange} />
                        <Input type="date" name="date_debut" label="date début" className=" mr-2" onChange={handleChange} />
                        <Input type="date" name="date_fin" label="date fin" className=" mr-2" onChange={handleChange} />
                        <Select label="Select Service"  onChange={handleSelect}  >
                        {
                            DataService.map(({ name, status, id }, key) => (
                           <Option value={name} >{name} . {status}</Option>
                           ))
                        }
                        </Select>
                        <Input type="file" name="file" className=" mr-2" onChange={handleFileChange} />


                    </DialogBody>
                    <DialogFooter>

                        <Button type="submit" className="h-[40px] mr-2 my-2 " >Submit</Button>

                        <Button variant="text" color="blue" onClick={handleClose} className="mr-1">
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>

            </Dialog>

        </>

    );
};

export default CeartStagier;






