import { Sequelize, DataTypes } from 'sequelize'

export default function (sequelize: Sequelize, dataTypes: any) {
    const entity = sequelize.define("tb_menu", {
        id: { field: "id", type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
        parentId: { field: "parentId", type: DataTypes.BIGINT, allowNull: true },
        menuName: {
            field: "menuName", type: DataTypes.STRING(45), allowNull: false,
            validate: { len: { args: [0, 45], msg: "The 'Menu Name' can be up to 45 characters" } }
        },
        menuSname: {
            field: "menuSname", type: DataTypes.STRING(1), allowNull: true,
            validate: { len: { args: [0, 1], msg: "The 'Menu Name' can be up to 1 characters" } }
        },
        menuPath: {
            field: "menuPath", type: DataTypes.STRING(100), allowNull: true,
            validate: { len: { args: [0, 100], msg: "The 'Menu Path' can be up to 100 characters" } }
        },
        menuIcon: {
            field: "menuIcon", type: DataTypes.STRING(100), allowNull: true,
            validate: { len: { args: [0, 100], msg: "The 'Menu Icon' can be up to 100 characters" } }
        },
        menuOrder: { field: "menuOrder", type: DataTypes.INTEGER, allowNull: true },
        regUserId: { field: "regUserId", type: DataTypes.BIGINT, allowNull: true },
        userGroupId: { field: "userGroupId", type: DataTypes.BIGINT, allowNull: true },
        regDtm: { field: "regDtm", type: DataTypes.DATE, allowNull: true },
        modUserId: { field: "modUserId", type: DataTypes.BIGINT, allowNull: true },
        modDtm: { field: "modDtm", type: DataTypes.DATE, allowNull: true },
        delYn: { field: "delYn", type: DataTypes.STRING(1), allowNull: true },
    }, {
        tableName: "tb_menu",
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return entity;
}
