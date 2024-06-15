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
  const handleSelect = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      service: e,
    }));
  };
  

  const handleOpen = async () => {
    setOpen(true);
    // Fetch trainee data from the backend
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
      await Conncetion.put(`/trainees/${id}`, formData);
      handleClose();
    } catch (error) {
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
              type="text"
              label="Telephone"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="etablissement"
              name="etablissement"
              value={formData.etablissement}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="cin"
              name="cin"
              value={formData.CIN}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="ville"
              name="ville"
              value={formData.Vill}
              onChange={handleChange}
            />
            <Input type="date" name="date_debut" label="Date début" value={formData.date_debut} className="mr-2" onChange={handleChange} />
            <Input type="date" name="date_fin" label="Date fin" value={formData.date_fin} className="mr-2" onChange={handleChange} />
            <Select label="Select Service" onChange={handleSelect}>
              {DataService.map(({ name, status, id }) => (
                <Option key={id} value={name}>{name} . {status}</Option>
              ))}
            </Select>
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
