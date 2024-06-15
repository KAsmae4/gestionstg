import { Card, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Conncetion } from "../../../ServerConection/conction";
import EediteStagier from "./EditeStagier";
import DeleteStagier from "./DeleteStagier";
import ExcelJS from 'exceljs'; // Import ExcelJS library

const TABLE_HEAD = ["Nom", "Prenom", "Email", "Telephone", "Etablissement", "CIN", "Vill", "Service", "date_debut", "date_fin", "pdf_path",""];

const Table_User = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]); // Added originalData state
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(10); // Number of items per page
    const [TABLE_ROWS, SetDataUSer] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Conncetion.get('/trainees');
            const data = response.data;
            SetDataUSer(response.data);
            setFilteredData(data);
            setOriginalData(data); // Set originalData state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            setFilteredData(originalData); // Restore original data
        } else {
            const filtered = originalData.filter((item) =>
                Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(searchTerm)
                )
            );
            setFilteredData(filtered);
        }
    };

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Card className=" w-full overflow-auto mt-3">
            <div className="p-2 flex justify-between items-center ">
                <div className="w-72">
                    <Input
                        label="Search"
                        onChange={handleSearch}
                        value={searchTerm}
                        placeholder="Search..."
                    />
                </div>
                <button onClick={exportToExcel} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                    Export to Excel
                </button>
            </div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={index}
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
            <div className="flex justify-center mt-4">
                <button
                    className={`px-3 py-1 rounded-md mr-2 ${
                        currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded-md mr-2 ${
                            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-200 text-blue-700'
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={`px-3 py-1 rounded-md ${
                        currentPage === Math.ceil(filteredData.length / itemsPerPage) ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </Card>
    );
};

export default Table_User;
