import React, { useEffect, useState } from 'react';
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchMenu();
    }, [page, size]);

    const fetchMenu = async () => {
        const response = await axios.get(`http://${serverIp}:${serverPort}/menu?page=${page}&size=${size}`);
        console.log(response.data);
        setMenu(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <h1>Menu List</h1>
            <ul>
                {menu.map(item => (
                    <li key={item.id}>{item.name} - {item.burgerPrice}</li>
                ))}
            </ul>
            <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
        </div>
    );
};

export default MenuList;
