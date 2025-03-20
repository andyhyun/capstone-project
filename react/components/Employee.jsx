import React, { useEffect, useState } from 'react';

const Employee = (props) => {
    const [flaskData, setFlaskData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/predict`, {
                    method: 'POST',
                    body: JSON.stringify({
                        job: [props?.data.job],
                        location: [props?.data.location]
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
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
    }, [props.data]);

    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h4 className="card-title">{props?.data.first_name} {props?.data.last_name}</h4>
                <div className="card-text">Username: {props?.data.username}</div>
                <div className="card-text">Phone Number:{props?.data.phone} </div>
                <div className="card-text">Location: {props?.data.location}</div>
                <div className="card-text">Job Role: {props?.data.job}</div>
                <div className="card-text">Salary: {props?.data.salary ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props?.data.salary) : 'Access Required'}</div>
                <div className="card-text">Predicted Salary: {flaskData?.prediction ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flaskData.prediction) : 'Loading...'}</div>
            </div>
            
        </div>
    );
};

export default Employee;