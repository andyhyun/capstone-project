import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/api/test', async (req, res) => {
    res.json({ message: 'hello' });
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
});