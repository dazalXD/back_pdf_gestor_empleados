const { DataTypes, Model } = require('sequelize');

class UserPermission extends Model {
    static initModel(sequelize) {
        UserPermission.init({}, { 
            sequelize, 
            modelName: 'UserPermission', // Usamos un nombre de modelo
            tableName: 'user_permissions', // Nombre exacto de tu tabla de unión
            timestamps: true 
        });
        return UserPermission;
    }
}
module.exports = UserPermission;