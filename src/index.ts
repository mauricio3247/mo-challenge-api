import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import debug from 'debug'

const log = debug(process.env.DEBUG)

app.listen(app.get('PORT'), ()=> log('app is running'))