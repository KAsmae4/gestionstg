import {
    Card,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { Conncetion } from "../../../ServerConection/conction";
import EediteStagier from "./EditeStagier";
import DeleteStagier from "./DeleteStagier";
import CeartStagier from "./NewStagier";
import ExcelJS from 'exceljs'; // Import ExcelJS library

const TABLE_HEAD = ["Nom", "Prenom", "Email", "Telephone", "Etablissement", "CIN", "Ville", "Service", "date_debut", "date_fin", "pdf_path", ""];

const ITEMS_PER_PAGE = 10;
const MAX_PAGES_DISPLAYED = 5;

export default function Table_Stagier() {
    const [TABLE_ROWS, SetDataUSer] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getDtaUSer = async _ => {
        const response = await Conncetion.get('/trainees');
        SetDataUSer(response.data);
        setFilteredData(response.data);
        setOriginalData(response.data);
    };

    useEffect(() => {
        getDtaUSer();
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Reset current page when data changes
    }, [filteredData]);

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Stagier Data");
    
        // Define header row style
        const headerStyle = {
            font: { bold: true },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFCCFFCC' } // light green background
            },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };
    
        // Define cell style
        const cellStyle = {
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };
    
        // Add headers, exclude pdf_path and id
        const headers = ["Nom", "Prenom", "Email", "Telephone", "Etablissement", "CIN", "Vill", "date_debut", "date_fin", "Service"];
        const headerRow = sheet.addRow(headers);
    
        // Apply header style
        headerRow.eachCell((cell) => {
            cell.style = headerStyle;
        });
    
        // Add data rows
        TABLE_ROWS.forEach(row => {
            const { name, surname, email, Telephone, etablissement, CIN, Vill, service, date_debut, date_fin } = row;
            const formattedRow = {
                name,
                surname,
                email,
                Telephone,
                etablissement,
                CIN,
                Vill,
                date_debut: new Date(date_debut).toISOString().split('T')[0], // Format date_debut
                date_fin: new Date(date_fin).toISOString().split('T')[0], // Format date_fin
                service
            };
            const rowData = Object.values(formattedRow);
            const dataRow = sheet.addRow(rowData);
    
            // Apply cell style
            dataRow.eachCell((cell) => {
                cell.style = cellStyle;
            });
        });
    
        // Adjust column widths to fit content
        sheet.columns.forEach(column => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
                const columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });
    
        // Generate Excel file
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'stagiaire_data.xlsx';
            link.click();
            window.URL.revokeObjectURL(url);
        });
    };

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
        <Card className="w-full overflow-auto mt-3">
            <div className="p-2 flex justify-between items-center">
                <div className="w-72">
                    <Input
                        label="Search"
                        onChange={handleSearch}
                        value={searchTerm}
                        placeholder="Search..."
                    />
                </div>
                <CeartStagier />
                <button onClick={exportToExcel} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                    Export to Excel
                </button>
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
                    {currentItems.map(({ name, surname, email, Telephone, etablissement, CIN, Vill, service, date_debut, date_fin, pdf_path, id }, index) => {
                        const isLast = index === currentItems.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={index}>
                                <td className={classes}>{name}</td>
                                <td className={classes}>{surname}</td>
                                <td className={classes}>{email}</td>
                                <td className={classes}>{Telephone}</td>
                                <td className={classes}>{etablissement}</td>
                                <td className={classes}>{CIN}</td>
                                <td className={classes}>{Vill}</td>
                                <td className={classes}>{service}</td>
                                <td className={classes}>{date_debut}</td>
                                <td className={classes}>{date_fin}</td>
                                <td className={classes}>{pdf_path}</td>
                                <td className={classes}>
                                    <div className="font-medium space-x-2">
                                        <EediteStagier id={id} />
                                        <DeleteStagier id={id} />
                                    </div>
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
