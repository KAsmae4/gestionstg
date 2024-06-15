import { Card, Typography, Input } from "@material-tailwind/react";
import EediteUSer from "./editeUser";
import DeleteUSer from "./DeleteUSer";
import AddUSer from "./addUSer";
import { useEffect, useState } from "react";
import { Conncetion } from "../../../ServerConection/conction";

const TABLE_HEAD = ["User", "CIN", "Vill", "Date_naissance", "Adresse", "Telephone", "service", ""];

const ITEMS_PER_PAGE = 10; // Number of items per page

export default function Table_User() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page state

    const [TABLE_ROWS, SetDataUSer] = useState([]);

    const getDtaUSer = async () => {
        try {
            const response = await Conncetion.get('/users');
            SetDataUSer(response.data);
            setFilteredData(response.data);
            setOriginalData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getDtaUSer();
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm === "") {
            setFilteredData(originalData);
        } else {
            const filtered = originalData.filter((item) =>
                Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(searchTerm)
                )
            );
            setFilteredData(filtered);
        }
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`mx-1 py-1 px-3 rounded-md ${
                        currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="mt-4 flex justify-center"> {/* Center pagination horizontally */}
                <div>
                    <button
                        className="mr-2 py-1 px-3 rounded-md bg-gray-200"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pages}
                    <button
                        className="ml-2 py-1 px-3 rounded-md bg-gray-200"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    return (
        <Card className=" w-full overflow-auto mt-3">
            <div className="p-2 flex  justify-between items-center ">
                <div className="w-72">
                    <Input
                        label="Search"
                        onChange={handleSearch}
                        value={searchTerm}
                        placeholder="Search..."
                    />
                </div>
                <AddUSer />
            </div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(({ Nome, Prenom, CIN, Vill, Date_naissance, Adresse, email, Telephone, service, id }, index) => {
                        const isLast = index === currentItems.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {Nome} {Prenom}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {CIN}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {Vill}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {Date_naissance}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {Adresse}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {Telephone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {service}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium space-x-2 "
                                    >
                                        <EediteUSer id={id} />
                                        <DeleteUSer id={id} />
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Pagination */}
            {renderPagination()}
        </Card>
    );
}
