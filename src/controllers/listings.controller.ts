import {Request, Response, NextFunction} from 'express'
import {listingDataMock} from '../helper/listings.data'
import moment from 'moment'
export const getListingByUUID = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {uuid} = req.params
        const notFoundResponse = {success:false, message:'Not found'}
        return res.json(listingDataMock.find (item => item.id === uuid) || notFoundResponse)
    } catch (error) {
        next(error)
    }

}

export const confirmReservation = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {uuid} = req.params
        const notFoundResponse = {success:false, message:'Not found'}
        const successResponse = {message: 'success! thanks for your reservation'}
        return res.json(listingDataMock.find (item => item.id === uuid) ? successResponse : notFoundResponse)
    } catch (error) {
        next(error)
    }

}


export const calculateReservationCost = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {uuid} = req.params
        const {checkin, checkout, adults, chidlren, pets} = req.body
        const product = listingDataMock.find (item => item.id === uuid)
        if(!product) {
            return res.json({status: false, message: 'product not found'})
        }
        const checkinDate = moment(checkin, 'YYYY-MM-DD')
        const checkoutDate = moment(checkout, 'YYYY-MM-DD')
        const nightsCount = checkoutDate.diff(checkinDate, 'days')
        let discount = 0;
        if(nightsCount > 7 ) {
            discount = discount + (product.weekly_discount * nightsCount / 7)
        }
        if(nightsCount > 30 ) {
            discount = discount + (product.monthly_discount  * nightsCount / 30)
        }

        discount = parseFloat(discount.toFixed(2))
        const nightsCost = parseFloat((nightsCount * product.base_price).toFixed(2))
        const total = nightsCost + product.cleaning_fee - discount
        return res.json({
            nights_count: nightsCount,
            nights_cost: nightsCost,
            discount,
            cleaning_fee: product.cleaning_fee,
            total
        })
    } catch (error) {
        next(error)
    }
}