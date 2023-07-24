// FileUpload & FileDownload
import FileController from "../coint/file/FileUpload";
// Login
import UserMenuController from "../coint/Controllers/system/menu/UserMenuController";
import AuthController from "../coint/Controllers/system/account/AuthController";
import MyinfoController from "../coint/Controllers/system/user/MyinfoController";
import AccountController from "../coint/Controllers/system/account/accountController";
// mail
import EmailSender from "../coint/Controllers/Email/email";
// System
import MenuController from "../coint/Controllers/system/menu/MenuController";
import UserController from "../coint/Controllers/system/user/UserController";
import UserGroupController from "../coint/Controllers/system/userGroup/UserGroupController";
import UserName from "../coint/Controllers/system/user/userNameCommon";
// Code
import CodeController from "../coint/Controllers/system/code/CodeController";
import GroupCodeController from "../coint/Controllers/system/code/GroupCodeController";

//system
import codeMaster from "../coint/Controllers/08.system/02_CodeMaster";
import menu from "../coint/Controllers/08.system/04_Menu";
import menuReg from "../coint/Controllers/08.system/06_MenuReg";
import columnBuilder from "../coint/Controllers/08.system/00_ColumBuilder"
//test
import GRID from "../coint/Controllers/99.Test/01_GRID";
import Columns from "../coint/Controllers/99.Test/02_Columns";


export default [
  ...FileController,
  // Login
  ...AuthController,
  ...MyinfoController,
  ...UserMenuController,
  // Emial
  ...EmailSender,

  // System
  ...MenuController,
  ...AccountController,
  ...UserController,
  ...UserName,
  ...UserGroupController,
  // Code
  ...CodeController,
  ...GroupCodeController,

  ///syste
  ...codeMaster,
  ...menu,
  ...menuReg,
  ...columnBuilder,
  ///Test
  ...GRID,
  ...Columns,
];
