import {Router} from 'express'
import listingsRoutes from './listings.routes'
const router = Router()

router.use('/listings', listingsRoutes)

export default router