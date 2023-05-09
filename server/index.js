import express from 'express'
import connectDB from './db/connect.js'
import { config } from 'dotenv'
import cors from 'cors'
import router from './routs/Routs.js'
config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/img', router)

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server Listing On Port ${port}`)
    })
  } catch (error) {
    console.log(error)
    console.log('SERVER OR DATABASE CONNECTION PROBLEM')
  }
}
start()
