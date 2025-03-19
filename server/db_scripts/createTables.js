import pool from '../lib/pool.js';

const createEmployeesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR NOT NULL UNIQUE,
            password VARCHAR NOT NULL,
            first_name VARCHAR NOT NULL,
            last_name VARCHAR NOT NULL,
            phone VARCHAR NOT NULL,
            job VARCHAR NOT NULL,
            location VARCHAR NOT NULL,
            salary INTEGER NOT NULL,
            is_hr BOOLEAN NOT NULL
        );
    `;
    const result = await pool.query(query);
    return result;
};

const createManagerEmployeesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS manager_employees (
            id SERIAL PRIMARY KEY NOT NULL,
            manager_id INTEGER REFERENCES employees (id),
            employee_id INTEGER REFERENCES employees (id)
        );
    `;
    const result = await pool.query(query);
    return result;
};

console.log(await createEmployeesTable());
console.log(await createManagerEmployeesTable());