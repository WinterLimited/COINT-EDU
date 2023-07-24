import {Sequelize, DataTypes } from 'sequelize'
// TASK_STEP = {
//     [CODE.TASK_DIV.BIM]: CODE.BIM_STEP,
//     [CODE.TASK_DIV.DESIGN]: CODE.DESIGN_STEP,
//     [CODE.TASK_DIV.EQUIP]: CODE.EQUIP_STEP,
//     [CODE.TASK_DIV.HUP]: CODE.HUP_STEP,
//     [CODE.TASK_DIV.MAT]: CODE.MAT_STEP
// }

// const TASK_STEP = {
//     BIM_STEP: {
//         ACQ: 'ACQ',
//         TRANS: 'TRANS',
//         ADAPT: 'ADAPT'
//     },
//     EQUIP_STEP: {
//         ACQ: 'ACQ',
//         MODELING: 'MODELING',
//         REG: 'REG'
//     },
//     MAT_STEP: {
//         ACQ: 'ACQ',
//         MODELING: 'MODELING',
//         REG: 'REG'
//     },
//     DESIGN_STEP: {
//         LAYOUT: 'LAYOUT',
//         HUPSPEC: 'HUPSPEC',
//         REINFOVIBE: 'REINFOVIBE',
//         GAS: 'GAS',
//         ELECTRAY: 'ELECTRAY',
//         HUP3: 'HUP3'
//     },
//     HUP_STEP: {
//         DESIGN: 'DESIGN',
//         AFC: 'AFC',
//         '5DU': '5DU'
//     },
// }

// export const CODE = {
//     QCL_DIV: {
//         QUAL: 'QUAL',
//         QUAN: 'QUAN',
//     },
//     EQUIP_DIV: {
//         NEW: 'NEW',
//         RELOC: 'RELOC',
//     },
//     EQUIP_MODULE_DIV: {
//         MAIN: 'MAIN',
//         SUB: 'SUB',
//     },
//     TASK_DIV: {
//         BIM: 'BIM',
//         EQUIP: 'EQUIP',
//         MAT: 'MAT',
//         DESIGN: 'DESIGN',
//         HUP: 'HUP',
//     },
//     TASK_STEP: {
//         BIM: TASK_STEP.BIM_STEP,
//         EQUIP: TASK_STEP.EQUIP_STEP,
//         MAT: TASK_STEP.MAT_STEP,
//         DESIGN: TASK_STEP.DESIGN_STEP,
//         HUP: TASK_STEP.HUP_STEP,
//     },
//     ...TASK_STEP,
//     TASK_STATUS: {
//         PROGRESS: 'PROGRESS',
//         COMPLETE: 'COMPLETE',
//         ISSUE: 'ISSUE',
//     },
//     QCL_RESULT: {
//         OK: 'OK',
//         NG: 'NG'
//     },
//     PROC_DIV: {
//         PROC_A: 'PROC_A',
//         PROC_B: 'PROC_B'
//     },
//     MAT_CONN_TYPE: {
//         BW: 'BW',
//         SKT: 'SKT',
//         LOC: 'LOC'
//     },
//     AREA_DIV: {
//         CLN: 'CLN',
//         CMP: 'CMP',
//         ETCH: 'ETCH',
//         CVD: 'CVD',
//         PVD: 'PVD',
//         PHOTO: 'PHOTO',
//         DIFF: 'DIFF',
//         IMP: 'IMP',
//         MI: 'MI'
//     },
//     ISSUE_STATUS: {
//         REQUEST: 'REQUEST',
//         ASSIGNED: 'ASSIGNED',
//         PROCESSING: 'PROCESSING',
//         COMPLETE: 'COMPLETE',
//         CONFIRMED: 'CONFIRMED'
//     },
//     Y_OR_N: {
//         Y: 'Y',
//         N: 'N'
//     },
//     FILE_DIV: {
//         BIM: 'BIM',
//         EQUIP: 'EQUIP',
//         MAT: 'MAT',
//         DESIGN: 'DESIGN',
//         HUP: 'HUP',
//         ISSUE: 'ISSUE',
//         PROFILE: 'PROFILE'
//     },
//     BIZREPORT_DIV: {
//         D: 'D',
//         W: 'W',
//         M: 'M'
//     },
//     LICENSE_DIV: {
//         '5D': '5D',
//         '3D': '3D',
//         CAD: 'CAD'
//     },
//     USER_TASK_DIV: {
//         BIM: 'BIM',
//         EQUIP: 'EQUIP',
//         MAT: 'MAT',
//         DESIGN: 'DESIGN',
//         HUP: 'HUP',
//         PMO: 'PMO',
//         BIZMNG: 'BIZMNG',
//         SYSMNG: 'SYSMNG'
//     },
//     TASK_PLAN_BASE: {
//         BIM_ACQ_DATE: 'BIM_ACQ_DATE',
//         EQUIP_ACQ_DATE: 'EQUIP_ACQ_DATE',
//         MAT_ACQ_DATE: 'MAT_ACQ_DATE',
//         EQUIP_HUP_DATE: 'EQUIP_HUP_DATE',
//         EQUIP_FABIN_DATE: 'EQUIP_FABIN_DATE'
//     },
//     CAL_DIV: {
//         DAY_OFF: 'DAY_OFF',
//         ATTENDANCE: 'ATTENDANCE',
//         CAL_1: 'CAL_1'
//     },
//     CAL_STATUS: {
//         REGISTERED: 'REGISTERED',
//         COMPLETE: 'COMPLETE',
//         CANCELED: 'CANCELED'
//     },
//     DEL_DIV: {
//         DEL: 'DEL',
//         MOD: 'MOD',
//     }
// }
export const CODE = {
    Y_OR_N: {
        Y: 'Y',
        N: 'N'
    }
}

export default function(sequelize: Sequelize, dataTypes: any) {
    const entity = sequelize.define("Code", {
        parentGroupCd: { field: "parentGroupCd", type: DataTypes.STRING(20), allowNull: true,
            validate: {len: {args: [0, 20], msg: "The 'ParentGroupCd' can be up to 20 characters"}}},
        parentCd: { field: "parentCd", type: DataTypes.STRING(20), allowNull: true,
            validate: {len: {args: [0, 20], msg: "The 'ParentCd' can be up to 20 characters"}}},
        groupCd: { field: "groupCd", type: DataTypes.STRING(20), allowNull: false, primaryKey: true,
            validate: {notEmpty: true, len: {args: [1, 20], msg: "The 'GroupCd' can be up to 20 characters"}}},
        cd: { field: "cd", type: DataTypes.STRING(20), allowNull: false, primaryKey: true,
            validate: {notEmpty: true, len: {args: [1, 20], msg: "The 'Cd' can be up to 20 characters"}}},
        name: { field: "name", type: DataTypes.STRING(45), allowNull: false,
            validate: {notEmpty: true, len: {args: [1, 45], msg: "The 'name' can be up to 45 characters"}}},
        order: { field: "order", type: DataTypes.INTEGER, allowNull: true,
            validate: {notEmpty: true, min: 0}},
        delYn: { field: "delYn", type: dataTypes.STRING(1), allowNull: true },
        regUserId: { field: "regUserId", type: dataTypes.BIGINT, allowNull: true },
        regDtm: { field: "regDtm", type: dataTypes.DATE, allowNull: true },
        modUserId: { field: "modUserId", type: dataTypes.BIGINT, allowNull: true },
        modDtm: { field: "modDtm", type: dataTypes.DATE, allowNull: true },
    }, {
        tableName: "tb_code",
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return entity;
}