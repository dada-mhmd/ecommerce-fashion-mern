import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/ProductModel.js';

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestseller === 'true' ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = await Product.create(productData);

    res.json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: 'No products found' });
    }
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
