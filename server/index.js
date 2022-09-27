require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
console.log(process.env.HTTP_PORT)
const PORT = process.env.HTTP_PORT || 5001

app.use(cors())
app.use(express.json())
app.get('/', async (req, res) => {
  const flight = await db.query('select * from flight');
  res.json(flight.rows);
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()