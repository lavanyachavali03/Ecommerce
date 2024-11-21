import { Order, OrderItem } from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import sequelize from '../config/database.js';

export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const cartItems = await Cart.findAll({
      where: { UserId: req.user.id },
      include: [Product],
      transaction: t
    });

    if (!cartItems.length) {
      throw new Error('Cart is empty');
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.Product.price * item.quantity);
    }, 0);

    const order = await Order.create({
      UserId: req.user.id,
      total
    }, { transaction: t });

    await Promise.all(cartItems.map(item => {
      return OrderItem.create({
        OrderId: order.id,
        ProductId: item.Product.id,
        quantity: item.quantity,
        price: item.Product.price
      }, { transaction: t });
    }));

    await Cart.destroy({
      where: { UserId: req.user.id },
      transaction: t
    });

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [OrderItem]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};