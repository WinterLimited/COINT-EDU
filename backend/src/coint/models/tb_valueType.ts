import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_valueType",
    {
      id: {
        field: "id",
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      parentId: {
        field: "parentId",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      valueTypeName: {
        field: "valueTypeName",
        type: DataTypes.STRING(50),
        allowNull: true,
      },

    },
    {
      tableName: "tb_valueType",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
