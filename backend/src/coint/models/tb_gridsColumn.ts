import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_gridsColumn",
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
      grdId: {
        field: "grdId",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      text: {
        field: "text",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valueType: {
        field: "valuetype",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      columnName: {
        field: "columnName",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      yn_del: {
        field: "yn_del",
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      columnIdx: {
        field: "columnIdx",
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "tb_gridsColumn",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
