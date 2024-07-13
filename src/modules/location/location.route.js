import { Router } from 'express';
import { getLocationByCountry, addLocation } from './location.controller.js';

const router = Router();

router.get('/:country', getLocationByCountry);
router.post('/', addLocation);

export { router as locationRoute };
