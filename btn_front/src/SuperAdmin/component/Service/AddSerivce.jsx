import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
    Input,
} from "@material-tailwind/react";
import { Conncetion } from "../../../ServerConection/conction";

export default function AddService() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Active"); // Default status

    const handleOpen = () => setOpen(!open);

    const handleInput = (e) => {
        
        if (e.target.name === "name") {
            setName(e.target.value);
        } 

    };
    const handleSelect = (e) => {
        
        setStatus(e);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, status };
        
        Conncetion.post('/services', data)
            .then(response => {
                console.log(response.data); 
                handleOpen(); 
            })
            .catch(error => {
                console.error(error); 
            });
    };

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                add service
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Its a simple dialog.</DialogHeader>
                    <DialogBody>
                        <div className="w-72">
                            <Input label="name service" name="name" onChange={handleInput} />
                        </div>
                        <div className="w-72">
                            <Select label="Select status" name="status" onChange={handleSelect}>
                                <Option value="active">Active</Option>
                                <Option value="inactive">inactive</Option>
                            </Select>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
