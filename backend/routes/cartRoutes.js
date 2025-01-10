import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartCtrl.js';
import authUser from '../middlewares/auth.js';
const router = express.Router();

router.get('/get', authUser, getUserCart);
router.post('/add', authUser, addToCart);
router.post('/update', authUser, updateCart);

export default router;
