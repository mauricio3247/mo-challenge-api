import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('PORT', process.env.PORT || 4000)

export default app