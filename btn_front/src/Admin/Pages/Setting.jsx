


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { Conncetion } from "../../ServerConection/conction";
import { useEffect, useState } from "react";






export default function SettingAdmin() {
    const [open, setOpen] = useState(false);
    const [DataService, SetDataService] = useState([]);
    const [formData, SetformData] = useState({
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
    })
    const getUser = async _ => {
        const res = await Conncetion.get("/getSuer")
        SetformData({ ...res.data })
    }
    const GetDataService = async _ => {
        const res = await Conncetion.get('/services')
        SetDataService(res.data)
    }

    useEffect(() => {
        getUser()
        GetDataService()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        SetformData((prevData) => ({
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
    const handleOpen = () => setOpen(!open);

    const handleSubmit = (e) => {
        e.preventDefault();
        Conncetion.put(`/users/${formData.id}`, formData)
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
        <div className=" w-[100%] ">
            <Card className="mt-6 w-[100%]">
                <form onSubmit={handleSubmit} action="">

                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Setting
                        </Typography>
                        <Typography className=" flex  flex-wrap space-x-2 space-y-2 ">

                            <div className="w-[300px]">
                                <Input
                                    type="text"
                                    label="Nome"
                                    name="Nome"
                                    value={formData.Nome}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="Prenom"
                                    name="Prenom"
                                    value={formData.Prenom}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="CIN"
                                    name="CIN"
                                    value={formData.CIN}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="Vill"
                                    name="Vill"
                                    value={formData.Vill}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="Date_naissance"
                                    name="Date_naissance"
                                    value={formData.Date_naissance}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="Adresse"
                                    name="Adresse"
                                    value={formData.Adresse}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="Telephone"
                                    name="Telephone"
                                    value={formData.Telephone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[300px]">
                                <Select label="Select Service" onChange={handleSelect}  >
                                    {
                                        DataService.map(({ name, status, id }, key) => (
                                            <Option key={id} value={String(name)}>{name} . {status}</Option>
                                        ))
                                    }
                                </Select></div>
                            <div className="w-[300px]">

                                <Input
                                    type="text"
                                    label="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>


                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button type="submit" >Save</Button>
                    </CardFooter>
                </form>

            </Card>
        </div>
    )
}









