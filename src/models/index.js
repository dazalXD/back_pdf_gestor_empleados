const sequelize = require('../config/db');
const User = require('./ModelUser');
const Permission = require('./ModelPermission');
const PrintConfig = require('./ModelprintConfig');
const Document = require('./ModelDocument');
const UserPermission = require('./ModelUserPermission');

// Inicializar modelos
User.initModel(sequelize);
Permission.initModel(sequelize);
PrintConfig.initModel(sequelize);
Document.initModel(sequelize);
UserPermission.initModel(sequelize);

// Definir asociaciones
User.belongsToMany(Permission, { through: 'user_permissions', foreignKey: 'userId', as: 'permissions' });
Permission.belongsToMany(User, { through: 'user_permissions', foreignKey: 'permissionId', as: 'users' });

module.exports = { sequelize, User, Permission, PrintConfig, Document, UserPermission };
/**
 * Aqui estan todos los modelos de la app
 */
//  User, Permission, PrintConfig, Document