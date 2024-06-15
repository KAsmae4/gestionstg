import React, { useEffect, useState } from "react";
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

export default function EediteUSer({ id }) {
  const [open, setOpen] = useState(false);
  const [DataService, SetDataService] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    Nome: "",
    Prenom: "",
    CIN: "",
    Vill: "",
    Date_naissance: "",
    Adresse: "",
    email: "",
    Telephone: "",
    service: "",
    password: "",
    rolesUser: '', 
  });

  const GetDataService = async () => {
    try {
      const res = await Conncetion.get(`/services`);
      SetDataService(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const res = await Conncetion.get(`/roles`);
      setRoles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await Conncetion.get(`/users/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetDataService();
    getRoles();
    getUser();
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      service: e,
    }));
  };

  const handleSelectRole = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      rolesUser: e, // Set rolesUser to the id of the selected role
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Conncetion.put(`/users/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        handleOpen();
        alert("User updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Edit User</DialogHeader>
          <DialogBody className=" space-y-2 " >
            <Input
              type="text"
              label="Nom"
              name="Nome"
              value={formData.Nome}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Prenom"
              name="Prenom"
              value={formData.Prenom}
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
              type="text"
              label="Date_naissance"
              name="Date_naissance"
              value={formData.Date_naissance}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Adresse"
              name="Adresse"
              value={formData.Adresse}
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
            <Select
              label="Select Service"
              onChange={handleSelect}
              value={formData.service}
            >
              {DataService.map(({ name, status, id }, key) => (
                <Option key={name} value={String(name)}>
                  {name} . {status}
                </Option>
              ))}
            </Select>
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Select
              label="Select Role"
              onChange={handleSelectRole}
              value={formData.rolesUser}
            >
              {roles.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
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
