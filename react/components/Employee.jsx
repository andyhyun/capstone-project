import React, { useEffect, useState } from 'react';

const Employee = (props) => {
    const [flaskData, setFlaskData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/test`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setFlaskData(data);
            } catch (err) {
                console.error("Error fetching Flask data");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">Employee Details</h5>
                <div className="card-text">Username: {props?.data.username}</div>
                <div className="card-text">First Name: {props?.data.first_name}</div>
                <div className="card-text">Last Name: {props?.data.last_name}</div>
                <div className="card-text">Phone Number:{props?.data.phone} </div>
                <div className="card-text">Location: {props?.data.location}</div>
                <div className="card-text">Job Role: {props?.data.job}</div>
                <div className="card-text">Salary: {props?.data.salary}</div>
                <div className="card-text">Flask Data: {flaskData.message}</div>
            </div>
            
        </div>
    );
};

export default Employee;