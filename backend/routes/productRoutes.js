import express from 'express';
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from '../controllers/productCtrl.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';
const router = express.Router();

router.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);
router.post('/remove', adminAuth, deleteProduct);
router.get('/single', getProduct);
router.get('/list', getProducts);

export default router;
