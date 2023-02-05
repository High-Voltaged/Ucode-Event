import express from 'express';
import profile from './profile';
import userCompanies from './user-companies';

const router = express.Router();

router.use('/profile', profile);
router.use('/me/companies', userCompanies);

export default router;
