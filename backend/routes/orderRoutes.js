import express from 'express';
import {
  getOrders,
  placeOrder,
  placeOrderStripe,
  updateOrderStatus,
  userOrders,
  verifyStripe,
} from '../controllers/orderCtrl.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';
const router = express.Router();

// admin routes
router.post('/list', adminAuth, getOrders);
router.post('/status', adminAuth, updateOrderStatus);

// payment
router.post('/place', authUser, placeOrder);
router.post('/stripe', authUser, placeOrderStripe);

router.post('/verifyStripe', authUser, verifyStripe);

router.post('/userorders', authUser, userOrders);

export default router;
