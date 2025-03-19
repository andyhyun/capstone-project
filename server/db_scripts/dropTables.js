import pool from '../lib/pool.js';

const dropTables = async () => {
    const query = `
        DROP TABLE IF EXISTS manager_employees, employees;
    `;
    const result = await pool.query(query);
    return result;
};

console.log(await dropTables());