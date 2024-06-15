
import { Outlet } from "react-router-dom";
import Side from "./Side";




export default function LayoutAdmin(){




    return(
        <div className=" w-[100%] h-[100vh] flex  ">
            <Side/>
            <Outlet/>
        </div>
    )


}
































