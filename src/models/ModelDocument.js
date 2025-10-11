const { DataTypes, Model } = require('sequelize');
class Document extends Model {
  static initModel(sequelize) {
    Document.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      contract: DataTypes.STRING,
      balance: DataTypes.DECIMAL(12,2),
      date: DataTypes.DATEONLY,
      phone: DataTypes.STRING,
      // otros campos que necesites
    }, { sequelize, modelName: 'document', tableName: 'documents', timestamps: true });
    return Document;
  }
}
module.exports = Document;
