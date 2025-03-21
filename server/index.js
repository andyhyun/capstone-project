import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT id, is_hr FROM employees WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ id: result.rows[0].id, is_hr: result.rows[0].is_hr });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// TODO: Register endpoint?
// TODO: Search endpoint

app.post('/api/employees', async (req, res) => {
    const { id, page } = req.body;
    try {
        const query = `
            SELECT
                id,
                username,
                first_name,
                last_name,
                phone,
                job,
                location,
                gender,
                CASE WHEN is_manager OR is_working_hr OR id = $1 THEN salary ELSE NULL END AS salary
            FROM (
                SELECT
                    employees.*,
                    EXISTS (
                        SELECT 1 FROM manager_employees WHERE manager_employees.manager_id = $2 AND manager_employees.employee_id = employees.id
                    ) AS is_manager,
                    EXISTS (
                        SELECT 1 FROM employees WHERE employees.id = $3 AND employees.is_hr = true
                    ) AS is_working_hr
                FROM employees
            ) temp
            LIMIT 12
            OFFSET $4;
        `;
        const result = await pool.query(query, [id, id, id, 12 * (page - 1)]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/employees/search', async (req, res) => {
    const { id, searchTerm, page } = req.body;
    try {
        const query = `
            SELECT
                id,
                username,
                first_name,
                last_name,
                phone,
                job,
                location,
                gender,
                CASE WHEN is_manager OR is_working_hr OR id = $1 THEN salary ELSE NULL END AS salary
            FROM (
                SELECT
                    employees.*,
                    EXISTS (
                        SELECT 1 FROM manager_employees WHERE manager_employees.manager_id = $2 AND manager_employees.employee_id = employees.id
                    ) AS is_manager,
                    EXISTS (
                        SELECT 1 FROM employees WHERE employees.id = $3 AND employees.is_hr = true
                    ) AS is_working_hr
                FROM employees
            ) temp
            WHERE
                CONCAT(first_name, ' ', last_name) LIKE $4
            LIMIT 12 OFFSET $5;
        `;
        const result = await pool.query(query, [id, id, id, `%${searchTerm}%`, 12 * (page - 1)]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM employees where employees.id = $1;`, [id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
});