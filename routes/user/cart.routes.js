import express from 'express';
import { addToCart, getAllInCart, removeFromCart } from '../../controllers/user/cart.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add-to-cart',protect,addToCart);
router.get('/get-cart',protect,getAllInCart);
router.delete('/remove-from-cart/:id',protect,removeFromCart);

export default router