import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Category from './category';

class Item extends Model {
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public quantity!: number;
}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'Items',
  timestamps: false,
});

Item.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Item, { foreignKey: 'categoryId' });

export default Item;