import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_grids",
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
      menuId: {
        field: "menuId",
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      grdName: {
        field: "grdName",
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      yn_del: {
        field: "yn_del",
        type: DataTypes.STRING(1),
        allowNull: true,
      },

    },
    {
      tableName: "tb_grids",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
