import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_gridsColumnOption",
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
      grdColId: {
        field: "grdColId",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      value: {
        field: "value",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valueType: {
        field: "valueType",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      paramName: {
        field: "paramName",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      yn_del: {
        field: "yn_del",
        type: DataTypes.STRING(1),
        allowNull: true,
      },
    },
    {
      tableName: "tb_gridsColumnOption",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
