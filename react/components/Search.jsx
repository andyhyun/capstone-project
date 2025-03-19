import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

const Search = (props) => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/employees/search", {
            method: "POST",
            body: JSON.stringify({ searchTerm, id: user.id }),
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
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;