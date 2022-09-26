import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.HTTP_PORT || 5001

app.use(cors())
/* app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) */
app.get('/', (req, res) => {
  res.send('hi')
})

const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
      console.log(e)
  }
}


start()