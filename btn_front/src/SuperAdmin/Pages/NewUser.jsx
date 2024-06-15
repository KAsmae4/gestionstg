import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import Table_Stagier from "../component/Stagier/TableStagier";


export default function New_User() {


    return (
        <div className=" w-[100%] p-3 ">
            <figcaption className=" flex w-[100%]  justify-between rounded-xl border   py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography variant="h5" className="   " >
                        Super admin
                    </Typography>
                </div>
                <Typography variant="h5" >
                    {/* <Switch color="green" defaultChecked /> */}
                </Typography>
            </figcaption>

            <Table_Stagier/>

        </div>
    )
}


























