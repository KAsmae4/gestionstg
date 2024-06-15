
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Conncetion } from "../../ServerConection/conction";








export default function LogOut() {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await Conncetion.post("/logout")
            console.log(res)
            navigate('/')
        } catch (error) {
            console.log("no")
        }
        

        console.log("Logged out");
    };

    return (
        <ListItem className="" onClick={handleLogout}>
            <ListItemPrefix>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 2ZM5.404 4.343a.75.75 0 0 1 0 1.06 6.5 6.5 0 1 0 9.192 0 .75.75 0 1 1 1.06-1.06 8 8 0 1 1-11.313 0 .75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
            </ListItemPrefix>
            Log Out
        </ListItem>
    )
}





















