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
const PORT = 3000;

app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test_users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
});