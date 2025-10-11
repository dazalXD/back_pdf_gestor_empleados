const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static initModel(sequelize) {
        User.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: { type: DataTypes.STRING, allowNull: false , unique: true},
            password: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.ENUM('activo', 'baja', 'cambiar_contraseña'), defaultValue: 'activo' },
            start_work: DataTypes.TIME,
            end_work: DataTypes.TIME
        }, { sequelize, modelName: 'user', tableName: 'users', timestamps: true });

        // hook para hashear password
        User.beforeCreate(async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        });
        User.beforeUpdate(async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        });
        return User;
    }

    async checkPassword(plain) {
        return await bcrypt.compare(plain, this.password);
        // return await plain == this.password;
    }
}

module.exports = User;