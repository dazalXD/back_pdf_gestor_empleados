const { DataTypes, Model } = require('sequelize');
class PrintConfig extends Model {
    static initModel(sequelize) {
        PrintConfig.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            pageSize: DataTypes.STRING, // A4, Letter...
            fontSize: DataTypes.INTEGER,
            fontFamily: DataTypes.STRING,
            backgroundImage: DataTypes.STRING // path o URL (subido con multer)
        }, { sequelize, modelName: 'printConfig', tableName: 'print_configs', timestamps: true });
        return PrintConfig;
    }
}
module.exports = PrintConfig;
