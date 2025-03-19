import pool from '../lib/pool.js';

const insertIntoEmployeesTable = async () => {
    const query = `
        INSERT INTO employees
            (username, password, first_name, last_name, phone, job, location, salary, is_hr)
        VALUES
            ('andy', 'password123', 'Andy', 'Kim', '(432) 564-7890', 'Data Engineer', 'Hartford', '85000', False),
             ('vincent', 'password123', 'Vincent', 'Loria', '860-213-5665', 'Cyber', 'Hartford', '180000', False),
            ('larry', 'password123', 'Larry', 'Pautz', '301-702-9892', 'HR Representative', 'St. Paul', '1000000', True),
            ('florenced', 'password123', 'Florence', 'Denny', '309-213-5665', 'Software Engineer', 'Hartford', '180000', False);
    `;
    const result = await pool.query(query);
    return result;
};

const insertIntoManagerEmployeesTable = async () => {
    const query = `
        INSERT INTO manager_employees
            (manager_id, employee_id)
        VALUES
            (3, 1);
    `;
    const result = await pool.query(query);
    return result;
};

console.log(await insertIntoEmployeesTable());
console.log(await insertIntoManagerEmployeesTable());