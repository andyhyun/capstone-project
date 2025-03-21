import React, { useEffect, useState } from 'react';

const Employee = (props) => {
    const [flaskData, setFlaskData] = useState({});
    const [profilePic, setProfilePic] = useState("");

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

  
    
        useEffect(() => {
            // Fetch a random user's picture
            console.log(props?.data.gender);
            fetch(`https://randomuser.me/api/?gender=${props?.data.gender.toLowerCase()}`)
                .then((response) => response.json())
                .then((result) => {
                    setProfilePic(result.results[0].picture.large);
                })
                .catch((error) => console.error("Error fetching profile picture:", error));
        }, [props.data]);

    return (
        <div className="card shadow" style={{ flex: '1', minWidth: '300px', maxWidth: '45%', backgroundColor: "#e3f0fa" }}>
            <div className="card-body">
            {profilePic && (
                    <img
                        className="shadow"
                        src={profilePic}
                        alt="User Profile"
                        style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid white", marginBottom: "10px" }}
                    />
                )}
                <h4 className="card-title">{props?.data.first_name} {props?.data.last_name}</h4>
                <div className="card-text">Username: {props?.data.username}</div>
                <div className="card-text">Phone Number: {props?.data.phone} </div>
                <div className="card-text">Location: {props?.data.location}</div>
                <div className="card-text">Job Role: {props?.data.job}</div>
                <div className="card-text">Salary: {props?.data.salary ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props?.data.salary) : '$******'}</div>
                <div className="card-text">Predicted Salary: {flaskData?.prediction ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flaskData.prediction) : <div className="spinner-grow spinner-grow-sm ms-1" role="status"><span className="sr-only"></span></div>}</div>
            </div>
            
        </div>
   );
};

export default Employee;