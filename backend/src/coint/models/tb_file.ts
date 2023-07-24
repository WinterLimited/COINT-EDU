import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize, dataTypes: any) {
    const entity = sequelize.define(
        "tb_file",
        {
            id: {
                field: "id",
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            nm_file: {
                field: "nm_file",
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            type_file: {
                field: "type_file",
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            uuid_file: {
                field: "uuid_file",
                type: DataTypes.STRING(500),
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
            tableName: "tb_file",
            underscored: true,
            freezeTableName: true,
            timestamps: false,
        }
    );
    return entity;
}
