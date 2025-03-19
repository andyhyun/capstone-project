import Employee from "./Employee";

const Home = (props) => {
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                props.data.map((employee) => (
                    <Employee key={employee.id} data={employee} />
                ))
            }
        </div>
    );
};

export default Home;