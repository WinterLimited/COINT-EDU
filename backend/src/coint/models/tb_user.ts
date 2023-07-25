import { Sequelize, DataTypes } from 'sequelize'

export default function (sequelize: Sequelize, dataTypes: any) {
    const entity = sequelize.define("tb_user", {
        id: { field: "id", type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
        usercondition: { field: "usercondition", type: DataTypes.STRING(50), allowNull: true },
        loginId: {
            field: "loginId", type: DataTypes.STRING(45), allowNull: false,
            validate: { len: { args: [0, 45], msg: "The 'Login Id' can be up to 45 characters" } }
        },
        loginPw: { field: "loginPw", type: DataTypes.STRING(60), allowNull: false },
        userName: { field: "userName", type: DataTypes.STRING(45), allowNull: false, },
        userDiv: { field: "userDiv", type: DataTypes.STRING(50), allowNull: true, },
        userPosition: {
            field: "userPosition", type: DataTypes.STRING(50), allowNull: true,
            validate: { len: { args: [0, 50], msg: "The 'Company Position' can be up to 50 characters" } }
        },
        userDuty: { field: "userDuty", type: DataTypes.STRING(50), allowNull: true },
        phone: { field: "phone", type: DataTypes.STRING(50), allowNull: true },
        email: { field: "email", type: DataTypes.STRING(50), allowNull: true },
        userGroupId: { field: "userGroupId", type: DataTypes.BIGINT, allowNull: true },
        regUserId: { field: "regUserId", type: DataTypes.BIGINT, allowNull: true },
        regDtm: { field: "regDtm", type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') },
        modUserId: { field: "modUserId", type: DataTypes.BIGINT, allowNull: true },
        modDtm: { field: "modDtm", type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') },
        delYn: { field: "delYn", type: DataTypes.STRING(1), allowNull: true, defaultValue: 'N' },
    }, {
        tableName: "tb_user",
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return entity;
}
