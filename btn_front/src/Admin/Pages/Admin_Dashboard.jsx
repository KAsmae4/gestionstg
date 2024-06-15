import { useEffect, useState } from "react";
import Header_Card from "../component/Dashboard/Header_Card";
import Table_User from "../component/Dashboard/Table_User";
import { Conncetion } from "../../ServerConection/conction";



export default function Dashboard_Admin() {

    const [dataUser,SetDataUSer]=useState({})
    const GetCountRole = async _=>{
        const res = await Conncetion.get('/RoleUserCounter');
        console.log(res.data)
        SetDataUSer({...dataUser,...res.data})
    }

    useEffect(()=>{
        GetCountRole()
    },[])


    return(
        <div className=" w-[100%] p-3  ">
            <div className=" w-[100%] flex   ">
            <Header_Card data={dataUser.admin} name='admin' />
                <Header_Card data={dataUser.superAdmin}  name='superAdmin' />
                <Header_Card data={dataUser.manager}  name='manager' />
            </div>
            
            <Table_User/>


        </div>
    )




}
































