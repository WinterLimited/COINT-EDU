import { Sequelize, DataTypes } from 'sequelize'

export default function (sequelize: Sequelize, dataTypes: any) {
    const entity = sequelize.define("tb_user_group", {
        id: { field: "id", type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
        userGroupName: {
            field: "userGroupName", type: DataTypes.STRING(45), allowNull: true,
            validate: { len: { args: [0, 45], msg: "The 'User Group Name' can be up to 45 characters" } }
        },
        descr: { field: "descr", type: DataTypes.STRING(255), allowNull: true },
        regUserId: { field: "regUserId", type: DataTypes.BIGINT, allowNull: true },
        regDtm: { field: "regDtm", type: DataTypes.DATE, allowNull: true },
        modUserId: { field: "modUserId", type: DataTypes.STRING(10), allowNull: true },
        modDtm: { field: "modDtm", type: DataTypes.DATE, allowNull: true },
        delYn: { field: "delYn", type: DataTypes.STRING(1), allowNull: true },
    }, {
        tableName: "tb_user_group",
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return entity;
}