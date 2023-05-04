const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
  // add properites here, ex:
  
  id: {
       type: DataTypes.INTEGER,
       allowNull:false,
       primaryKey:true,
       autoIncrement: true,
  },
  category_name:{
      type:DataTypes.STRING,
      allowNull:false,
     
  },

},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
