import { Router } from 'express';
import { getLikesByUserId, likeProduct } from './like.controller.js';

const router = Router();

router.post('/', likeProduct);
router.get('/:userId', getLikesByUserId);

export { router as likeRoute };
