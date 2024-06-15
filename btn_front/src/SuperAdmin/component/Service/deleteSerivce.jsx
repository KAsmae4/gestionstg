

import React, { useState, useEffect } from "react";
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

export default function DeleteService({ id }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        // Fetch the service data by ID when the component mounts
        Conncetion.get(`/services/${id}`)
            .then(response => {
                const { name, status } = response.data;
                setName(name);
                setStatus(status);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]); // Fetch data whenever the ID changes

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

        Conncetion.delete(`/services/${id}`, data)
            .then(response => {
                console.log(response.data);
                handleOpen();
                alert('Service updated successfully');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Button onClick={handleOpen} variant="outlined">
                delete
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>delete Service</DialogHeader>
                    <DialogBody>
                        srvice nae : {name} 
                        status : {status}
                        
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
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
