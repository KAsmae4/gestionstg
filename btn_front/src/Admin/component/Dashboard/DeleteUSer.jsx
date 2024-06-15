
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Conncetion } from "../../../ServerConection/conction";
 
export default function DeleteUSer({id}) {

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);


  const handelDelet = async _=>{
    try {
      await Conncetion.delete(`/users/${id}`) 
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    } finally {
      handleOpen();
    }
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
      Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete user .</DialogHeader>
        <DialogBody>
          Are you sure you want delete this user ?
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
          <Button variant="gradient" color="green" onClick={handelDelet}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}































