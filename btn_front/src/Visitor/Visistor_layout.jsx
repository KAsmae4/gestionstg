import { Outlet } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import videLogin from "../assets/video/woow.mp4"

export default function Visitor_Layout() {
    


    return(
        <div className=" flex w-[100%] h-[100vh]  ">
            <div className="w-[550px]  ">
                {/* absolute inset-0 w-full h-full object-cover z-0 */}
                <video autoPlay loop muted className="  w-full h-full object-cover ">
                    <source src={videLogin} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className=" w-full  border  flex items-center justify-center ">
            <Outlet/>
                
            
            </div>
        </div>
    )
}


















