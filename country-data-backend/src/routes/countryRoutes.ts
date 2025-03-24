import express from 'express';
import { getCountries, getCountryByCode, filterCountriesByRegion, searchCountries } from '../controllers/countryController';

const router = express.Router();

router.get('/', getCountries);
router.get('/code/:code', getCountryByCode);
router.get('/region/:region', filterCountriesByRegion);
router.get('/search', searchCountries);

export default router;
