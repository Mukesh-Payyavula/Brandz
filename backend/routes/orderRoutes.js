import express from 'express';
import Order from '../models/orderModel.js';
import {
  addOrderItems,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDeliver,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create Order Route (previously addOrderItems in controller)
router.post('/', protect, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
    isPaid: paymentMethod !== 'COD', // COD orders are initially unpaid
    paidAt: paymentMethod !== 'COD' ? Date.now() : null, // Only set paidAt for non-COD
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json({ order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get Orders (for admin)
router.route('/').get(protect, admin, getOrders);

// Get My Orders (user specific)
router.route('/myorders').get(protect, getMyOrders);

// Get Order by ID (for user and admin)
router.route('/:id').get(protect, getOrder);

// Pay Order Route (for both COD and other methods)
router.put('/:id/pay', protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Only allow payment updates if the payment is not already processed
  if (order.isPaid) {
    return res.status(400).json({ message: 'Order is already paid' });
  }

  // Update the order to mark as paid (for COD orders)
  order.isPaid = true;
  order.paidAt = Date.now(); // Record the payment date
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  try {
    const updatedOrder = await order.save();
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Payment update failed' });
  }
});

// Update Order to Delivered (Admin only)
router.put('/:id/deliver', protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  try {
    const updatedOrder = await order.save();
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Delivery update failed' });
  }
});

// Controller Functions (refactoring previous code to use controller functions)

const addOrderItemsController = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
      isPaid: paymentMethod !== 'COD', // COD orders are initially unpaid
      paidAt: paymentMethod !== 'COD' ? Date.now() : null, // Only set paidAt for non-COD
    });

    try {
      const createdOrder = await order.save();
      res.status(201).json({ order: createdOrder });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' });
    }
  }
};

// Use Controller functions for `getOrder`, `updateOrderToPaid`, and `updateOrderToDeliver`

const getOrderController = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

const updateOrderToPaidController = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Only allow payment updates if the payment is not already processed
  if (order.isPaid) {
    return res.status(400).json({ message: 'Order is already paid' });
  }

  // Update the order to mark as paid (for COD orders)
  order.isPaid = true;
  order.paidAt = Date.now(); // Record the payment date
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  try {
    const updatedOrder = await order.save();
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Payment update failed' });
  }
};

const updateOrderToDeliverController = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  try {
    const updatedOrder = await order.save();
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Delivery update failed' });
  }
};

export default router;
