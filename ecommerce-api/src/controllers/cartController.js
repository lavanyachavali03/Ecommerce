import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    const [cart] = await Cart.findOrCreate({
      where: { UserId: req.user.id, ProductId: productId },
      defaults: { quantity }
    });

    if (cart.quantity !== quantity) {
      await cart.update({ quantity });
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { UserId: req.user.id },
      include: [Product]
    });
    
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.Product.price * item.quantity);
    }, 0);

    res.json({ items: cartItems, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        UserId: req.user.id,
        ProductId: req.params.productId
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};