import {Router} from 'express'
import { calculateReservationCost, confirmReservation, getListingByUUID } from '../controllers/listings.controller'

const router = Router()

router.get('/:uuid', getListingByUUID)
router.post('/:uuid/reservation-cost', calculateReservationCost)
router.post('/:uuid/confirm-reservation', confirmReservation)
export default router