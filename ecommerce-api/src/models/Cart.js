import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Cart.belongsTo(User);
Cart.belongsTo(Product);

export default Cart;