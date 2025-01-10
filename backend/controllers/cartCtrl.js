import User from '../models/userModel.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.status(201).json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData?.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
