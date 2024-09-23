const db = require('../config/db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    activationLink: {type: DataTypes.STRING, allowNull: false, unique: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Token = db.define('token', {
    id: {type: DataTypes.STRING, primaryKey: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Category = db.define('category', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Brand = db.define('brand', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    image: {type: DataTypes.BLOB, allowNull: false}
});

const Product = db.define('product', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(500), allowNull: false},
    image: {type: DataTypes.BLOB, allowNull: false},
    price: {type: DataTypes.FLOAT, defaultValue: 0},
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
    dislikes: {type: DataTypes.INTEGER, defaultValue: 0}
});

const ProductInfo = db.define('info', {
    id: {type: DataTypes.STRING, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    body: {type: DataTypes.STRING, allowNull: false}
});

const CartItem = db.define('cart_item', {
    id: {type: DataTypes.STRING, primaryKey: true}
});

const Rating = db.define('rating', {
    id: {type: DataTypes.STRING, primaryKey: true},
    isLike: {type: DataTypes.BOOLEAN, defaultValue: false},
    isDislike: {type: DataTypes.BOOLEAN, defaultValue: false}
});

User.hasOne(Token);
Token.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Brand.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

User.hasMany(CartItem);
CartItem.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

User.hasMany(Rating);
Rating.belongsTo(User);

Product.hasMany(Rating);
Rating.belongsTo(Product);

module.exports = {
    User,
    Token,
    Category,
    Brand,
    Product,
    ProductInfo,
    CartItem,
    Rating
};