

import { Typography , Switch} from "@material-tailwind/react";
import Header_Card from "../component/Dashboard/Header_Dashboard";
import Table_user from "../component/Dashboard/TableUser";
import { Conncetion } from "../../ServerConection/conction";
import { useEffect, useState } from "react";



export default function Dashboard() {

    const [dataUser,SetDataUSer]=useState({})
    const GetCountRole = async _=>{
        const res = await Conncetion.get('/RoleUserCounter');
        console.log(res.data)
        SetDataUSer({...dataUser,...res.data})
    }

    useEffect(()=>{
        GetCountRole()
    },[])


    return (
        <div className="w-[100%] p-2">
            {/* -translate-x-2/4  border-white bg-white/75   */}
            <figcaption className=" flex w-[100%]  justify-between rounded-xl border   py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography variant="h5" className="  " >
                        Super admin
                    </Typography>
                </div>
                <Typography variant="h5" >
                <Switch color="green" defaultChecked />
                </Typography>
            </figcaption>
            
            <div className=" w-[100%] flex  ">
                <Header_Card data={dataUser.admin} name='admin' />
                <Header_Card data={dataUser.superAdmin}  name='superAdmin' />
                <Header_Card data={dataUser.manager}  name='superviseur' />
            </div>

            <div className="w-[100%]  ">
                <Table_user/>
            </div>






        </div>

    )
}































