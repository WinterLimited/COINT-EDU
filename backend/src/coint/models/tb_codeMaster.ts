import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
  const entity = sequelize.define(
    "tb_codeMaster",
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
        allowNull: true,
      },
      nm_page: {
        field: "nm_page",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      nm_code: {
        field: "nm_code",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      code: {
        field: "code",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      descr: {
        field: "descr",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      id_regist: {
        field: "id_regist",
        type: DataTypes.BIGINT,
        allowNull: true
      },
      dt_regist: {
        field: "dt_regist",
        type: DataTypes.DATE,
        allowNull: true
      },
      yn_del: {
        field: "yn_del",
        type: DataTypes.STRING(1),
        allowNull: true,
      },

    },
    {
      tableName: "tb_codeMaster",
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    }
  );
  return entity;
}
