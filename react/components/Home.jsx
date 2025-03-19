import { useEffect, useState } from "react";
import Employee from "./Employee";
import { useAuth } from "../hooks/AuthContext";
import Search from "./Search";

const Home = (props) => {
    const [data, setData] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:3000/api/employees`);
                const response = await fetch(`http://localhost:3000/api/employees`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user.id, is_hr: user.is_hr }),
                });
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setData(json_response); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                data.map((employee) => (
                    <Employee key={employee.id} data={employee} />
                ))
            }
            <Search setData={setData}/>
        </div>
    );
};

export default Home;