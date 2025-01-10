import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Stripe from 'stripe';

// global vars
const currency = 'usd';
const deliveryCharge = 10;

// stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    };

    const order = new Order(orderData);
    await order.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(201)
      .json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };
    const order = new Order(orderData);
    await order.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: 'payment',
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// verify stripe payment
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === 'true') {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// admin panel orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user data orders for frontend
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
