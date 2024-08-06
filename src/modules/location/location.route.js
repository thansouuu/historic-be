import { Router } from 'express';
import { getLocationByCountry, addLocation, getLocationByUserId,getLocation,updateLocationForUser } from './location.controller.js';

const router = Router();

router.get('/:country', getLocationByCountry);
router.post('/', addLocation);
router.get('/direction/:userId',getLocationByUserId)
router.get('/list/:country', getLocation);
router.post('/:userId', updateLocationForUser);



export { router as locationRoute };