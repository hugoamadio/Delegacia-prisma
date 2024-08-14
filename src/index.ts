import express from 'express'
import * as dotenv from 'dotenv'
import criminalRoutes from './routes/criminal.routes'
import armRoutes from './routes/arm.routes'
import crimeRoutes from './routes/crime.routes'

dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/criminal", criminalRoutes())
app.use("/arm", armRoutes())
app.use("/crime", crimeRoutes())

app.listen(PORT, ()=> {
    console.log(`Server running in port ${PORT}`)
})