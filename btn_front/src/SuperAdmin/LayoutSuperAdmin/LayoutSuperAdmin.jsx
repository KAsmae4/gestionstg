import { Outlet } from "react-router-dom";
import Side from "./side";




export default function LayoutSuperAdmin(){




    return(
        <div className=" w-[100%] h-[100vh] flex ">
            {/* bg-[#002244]  */}
            <Side/>
            <Outlet/>
        </div>
    )


}















