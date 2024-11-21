import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, isAdmin, createProduct);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

export default router;