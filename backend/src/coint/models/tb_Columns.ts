import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_Columns",
    {
      id: {
        field: "id",
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_parent: {
        field: "id_parent",
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      Column_ID: {
        field: "Column_ID",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Column_Name: {
        field: "Column_Name",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      width: {
        field: "width",
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      Visible: {
        field: "Visible",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Edit: {
        field: "Edit",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      CellType: {
        field: "CellType",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      step: {
        field: "step",
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      align: {
        field: "align",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "tb_Columns",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
