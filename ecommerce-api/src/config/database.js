import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../../database.sqlite'),
  logging: false
});

export default sequelize;