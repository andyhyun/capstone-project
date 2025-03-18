import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/test', async (req, res) => {
    res.json({ message: 'hello' });
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
});