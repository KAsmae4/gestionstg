import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { Conncetion } from "../../../ServerConection/conction";

export default function DeleteStagier({ id }) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            await Conncetion.delete(`/trainees/${id}`);
            handleClose(); // Close the dialog after successful deletion
        } catch (error) {
            console.error("Error deleting trainee:", error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogHeader>Delete User</DialogHeader>
                <DialogBody>
                    Are you sure you want to delete this user?
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleDelete} className="mr-1">
                        Delete
                    </Button>
                    <Button variant="text" color="blue" onClick={handleClose} className="mr-1">
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
