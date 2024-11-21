import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:productId', removeFromCart);

export default router;