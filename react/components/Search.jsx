import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

const Search = (props) => {
    const { user } = useAuth();
    // const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/employees/search", {
            method: "POST",
            body: JSON.stringify({ searchTerm: props.searchTerm, id: user.id, page: props.currentPage }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                props.setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        props.setCurrentPage(1);
    };

    const handleChange = (e) => {
        props.setSearchTerm(e.target.value);
        console.log(props.searchTerm);
    };

    return (
        <form style={{ margin: "20px 0" }} className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={props.searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;