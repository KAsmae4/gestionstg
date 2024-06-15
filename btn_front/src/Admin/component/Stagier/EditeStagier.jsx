import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Conncetion } from "../../../ServerConection/conction";

export default function EediteStagier({ id }) {
  const [open, setOpen] = useState(false);
  const [DataService, SetDataService] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    Telephone: "",
    etablissement: "",
    CIN: "",
    Vill: "",
    date_debut: "",
    date_fin: "",
    service: "",
  });
  const GetDataService = async () => {
    try {
      const res = await Conncetion.get(`/services`);
      SetDataService(res.data);
    } catch (error) {
      console.error(error);
    }
  };
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
  useEffect(() => {
    GetDataService();
  }, []);
  const handleClose = () => setOpen(false);
  const handleSelect = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      service: e,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Conncetion.put(`/trainees/${id}`, formData);
      handleClose();
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating trainee:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              label="CIN"
              name="cin"
              value={formData.CIN}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Ville"
              name="ville"
              value={formData.Vill}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="date debut"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="date fin"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
            />
            <Select
              label="Select Service"
              onChange={handleSelect}
              value={formData.service}
            >
              {DataService.map(({ name, status, id }, key) => (
                <Option key={id} value={String(name)}>
                  {name} . {status}
                </Option>
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
