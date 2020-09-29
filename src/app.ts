import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './routes/index'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', router)
app.set('PORT', process.env.PORT || 4000)

export default app