import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_GRID",
    {
      id: {
        field: "id",
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      grid_ID: {
        field: "grid_ID",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      grid_Name: {
        field: "grid_Name",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "tb_GRID",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
