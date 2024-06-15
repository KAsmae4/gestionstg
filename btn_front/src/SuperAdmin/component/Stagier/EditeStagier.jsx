import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { Conncetion } from "../../../ServerConection/conction";

export default function EediteStagier({ id }) {
  const [open, setOpen] = useState(false);
  const [DataService, SetDataService] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    Telephone: '',
    etablissement: '',
    CIN: '',
    Vill: '',
    date_debut: '',
    date_fin: '',
    service: '',

  });
  const GetDataService = async () => {
    const res = await Conncetion.get('/services');
    SetDataService(res.data);
};

useEffect(() => {
    GetDataService();
}, []);

  const handleOpen = async () => {
    setOpen(true);

    try {
      const response = await Conncetion.get(`/trainees/${id}`);
      const traineeData = response.data;
      setFormData(traineeData);
    } catch (error) {
      console.error("Error fetching trainee data:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Log `formData` just before making the API request
        console.log('Submitting formData:', formData);

        // Make the PUT request to update trainee data
        const response = await Conncetion.put(`/trainees/${id}`, formData);

        // Check if the update request was successful
        if (response.status === 200) {
            // Log success message
            console.log('Trainee updated successfully!');
            // Close the dialog
            handleClose();
        } else {
            // Log unexpected response status
            console.error('Unexpected response status:', response.status);
        }
    } catch (error) {
        // Log any errors that occur during the update request
        console.error("Error updating trainee:", error);
    }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Edit Stagiaire</DialogHeader>
          <DialogBody className="space-y-2">
            <Input
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Telephone"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Etablissement"
              name="etablissement"
              value={formData.etablissement}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="CIN"
              name="CIN"
              value={formData.CIN}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Ville"
              name="Vill"
              value={formData.Vill}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Date début"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Date fin"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
            />
            <Select label="Select Service" onChange={handleChange}>
              {DataService.map(({ name, service, id }) => (
                <Option key={id} value={name}>{name} . {service}</Option>
              ))}
            </Select>
            <Input type="file" name="file" className="mr-2" onChange={handleChange} />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleClose} className="mr-1">
              Cancel
            </Button>
            <Button variant="gradient" color="green" type="submit">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
