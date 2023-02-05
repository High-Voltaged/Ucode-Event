import express from 'express';
import {
  deleteProfile,
  updateProfile,
  updateUserAvatar,
  uploadPhoto,
} from '../controllers/profile';
import authMiddleware from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { updateSchema } from '../validation/user';

const router = express.Router();

router.use(authMiddleware);

router.patch('/avatar', boundary(uploadPhoto), boundary(updateUserAvatar));
router.patch('/', validate(updateSchema), boundary(updateProfile));
router.delete('/', boundary(deleteProfile));

export default router;