import { Router } from 'express';
import { getLocationByCountry, addLocation, getLocationByUserId,getLocation } from './location.controller.js';

const router = Router();

router.get('/:country', getLocationByCountry);
router.post('/', addLocation);
router.get('/direction/:userId',getLocationByUserId)
router.get('/list/:country', getLocation);


export { router as locationRoute };
