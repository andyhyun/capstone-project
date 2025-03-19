import { useEffect, useState } from "react";
import Employee from "./Employee";
import { useAuth } from "../hooks/AuthContext";
import Search from "./Search";

const Home = (props) => {
    const [data, setData] = useState([])
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/employees`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user.id, is_hr: user.is_hr, page: currentPage }),
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
    }, [user, currentPage]);

    

    // const totalPages = Math.ceil(data.length / employeesPerPage);

    const nextPage = () => {
        // if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                data.map((employee) => (
                    <Employee key={employee.id} data={employee} currentPage={currentPage} />
                ))
            }
            <Search setData={setData}/>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>
                    {/* Page {currentPage} of {totalPages} */}
                    Page {currentPage}
                </span>
                <button onClick={nextPage}>
                {/* <button onClick={nextPage} disabled={currentPage === totalPages}> */}
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;