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

export default function AddUser() {

  const [roles, setRoles] = useState([]);



  const fetchData = async () => {
    try {
      const res = await Conncetion.get("/roles");
      setRoles(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [open, setOpen] = useState(false);
  const [DataService, SetDataService] = useState([]);
  const [formData, setFormData] = useState({
    Nome: '',
    Prenom: '',
    CIN: '',
    Vill: '',
    Date_naissance: '',
    Adresse: '',
    email: '',
    Telephone: '',
    service: '',
    password: '',
    rolesUser: '',
  });

  const GetDataService = async () => {
    const res = await Conncetion.get('/services');
    SetDataService(res.data);
  }

  useEffect(() => {
    GetDataService();
    fetchData();
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
    Conncetion.post("/users", formData)
      .then((response) => {
        console.log(response.data);
        handleOpen();
        alert("User added successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add user
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Add User</DialogHeader>
          <DialogBody className=" space-y-2 " >
            <Input
              type="text"
              label="Nome"
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
              label="Vill"
              name="Vill"
              value={formData.Vill}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Date de naissance"
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
            <Select label="Select Service" onChange={handleSelect}  >
              {
                DataService.map(({ name, status, id }) => (
                  <Option key={id} value={String(name)}>{name} . {status}</Option>
                ))
              }
            </Select>
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Select label="Select role" onChange={handleSelectRole}  >
              {
                roles.map(({ name }, key) => (
                  <Option value={name} >{name} </Option>
                ))
              }
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
