const { DataTypes, Model } = require('sequelize');
class Permission extends Model {
  static initModel(sequelize) {
    Permission.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      key: { type: DataTypes.STRING, unique: true } // ej: 'users.manage', 'documents.generate'
    }, { sequelize, modelName: 'permission', tableName: 'permissions', timestamps: true });
    return Permission;
  }
}
module.exports = Permission;
