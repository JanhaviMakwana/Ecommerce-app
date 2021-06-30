const dbConfig = require('../config/database');

const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.cart = require('./cart')(sequelize, Sequelize);
db.cartItem = require('./cart-item')(sequelize, Sequelize);
db.products = require('./product')(sequelize, Sequelize);
db.order = require('./order')(sequelize, Sequelize);
db.orderItem = require('./order-item')(sequelize, Sequelize);

db.products.belongsTo(db.user, { constraints: true, onDelete: 'CASCADE' });
db.user.hasMany(db.products);
db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);
db.cart.belongsToMany(db.products, { through: db.cartItem });
db.products.belongsToMany(db.cart, { through: db.cartItem });
db.order.belongsTo(db.user);
db.user.hasMany(db.order);
db.order.belongsToMany(db.products, { through: db.orderItem });
db.products.belongsToMany(db.order, { through: db.orderItem });
module.exports = db;