import { Button } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <Button>Button</Button>
      <Outlet/>
    </h1>
  )
}