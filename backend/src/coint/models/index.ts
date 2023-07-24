'use strict';

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import dbjson from './../../resources/db.json'

const basename: string = path.basename(__filename);
const db: any = {};
let config: any = (dbjson as any)[process.env.NODE_ENV as any]
if (config.dialectOptions && config.dialectOptions.ssl) {
  config = {
    ...config
    // dialectOptions: {
    // ssl: {
    //   key: fs.readFileSync(config.dialectOptions.ssl.key),
    //   cert: fs.readFileSync(config.dialectOptions.ssl.cert),
    //   ca: fs.readFileSync(config.dialectOptions.ssl.ca)
    // }
    // }
  }
}

let sequelize: Sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);
fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file: any) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// set relations

db.tb_valueType.hasMany(db.tb_gridsColumn, { foreignKey: 'id' })
db.tb_gridsColumn.belongsTo(db.tb_valueType,
  { foreignKey: 'valueType', as: 'vt' })

db.tb_valueType.hasMany(db.tb_gridsColumnOption, { foreignKey: 'id' })
db.tb_gridsColumnOption.belongsTo(db.tb_valueType,
  { foreignKey: 'valueType', as: 'vt' })

db.tb_menu.hasMany(db.tb_grids, { foreignKey: 'id' })
db.tb_grids.belongsTo(db.tb_menu,
  { foreignKey: 'menuId', as: 'menu' })





export = db;
