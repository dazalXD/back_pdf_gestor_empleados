const sequelize = require('../config/db');
const User = require('./ModelUser');
const Permission = require('./ModelPermission');
const PrintConfig = require('./ModelprintConfig');
const Document = require('./ModelDocument');
// Inicializar modelos
User.initModel(sequelize);
Permission.initModel(sequelize);
PrintConfig.initModel(sequelize);
Document.initModel(sequelize);

User.belongsToMany(Permission, { through: 'user_permissions' });
Permission.belongsToMany(User, { through: 'user_permissions' });

module.exports = { sequelize, User, Permission, PrintConfig, Document };
/**
 * Aqui estan todos los modelos de la app
 */
//  User, Permission, PrintConfig, Document