import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login  from "../Visitor/login";
import Visitor_Layout from "../Visitor/Visistor_layout";
import LayoutSuperAdmin from "../SuperAdmin/LayoutSuperAdmin/LayoutSuperAdmin";
import Dashboard from "../SuperAdmin/Pages/Dashboard";
import LayoutAdmin from "../Admin/AdminLayout/AdminLayout";
import Dashboard_Admin from "../Admin/Pages/Admin_Dashboard";
import Password_resets from "../Visitor/password_resets";
import NewPassword from "../Visitor/NewPassword";
import VerificationCode from "../Visitor/validation_code";
import New_User from "../SuperAdmin/Pages/NewUser";
import Setting from "../SuperAdmin/Pages/Setting";
import Service from "../SuperAdmin/Pages/Service";
import SettingAdmin from "../Admin/Pages/Setting";
import LayoutManager from "../manager/LayoutManager/LayoutManager";
import DashboardManager from "../manager/Pages/Dashboard";
import CeartStagier from "../manager/Pages/Stagier";
import SettingManager from "../manager/Pages/SettindManager";
import AdminStagier from "../Admin/Pages/AdminStagier";



export const Rout_app = createBrowserRouter([
    {
        element: <Visitor_Layout />,
        children: [
            {
                path: "/",
                element: <Login/>
            },
            {
                path:"/VerificationEmail",
                element:<Password_resets/>
            },
            // {
            //     path:"/VerificationCode",
            //     element:<VerificationCode/>
            // },
            {
                path:"/password-reset/:token",
                element:<NewPassword/>
            }
        ]
    },
    {
        element:<LayoutSuperAdmin/>,
        children:[
            {
                path:"/SuperAdmin/",
                element:<Dashboard/>
            },
            {
                path:"/SuperAdmin/NewService",
                element:<Service/>
            },
            {
                path:"/SuperAdmin/newUSer",
                element:<New_User/>
            },
            {
                path:"/SuperAdmin/Setting",
                element:<Setting/>
            }
        ]
    },
    {
        element:<LayoutAdmin/>,
        children:[
            {
                path:"/admin/",
                element:<Dashboard_Admin/>
            },
            {
                path:"/admin/Setting",
                element:<SettingAdmin/>
            },
            {
                path:"/admin/Stagier",
                element:<AdminStagier/>
            }
        ]
    },
    {
        element:<LayoutManager/>,
        children:[
            {
                path:"/manager",
                element:<DashboardManager/>
            },
            {
                path:"/manager/stagier",
                element:<CeartStagier/>
            },
            {
                path:"/manager/setting",
                element:<SettingManager/>
            }
        ]
    }

])
