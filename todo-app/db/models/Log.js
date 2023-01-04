import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../index";

const Log = db.define("Log", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  changes: {
    type: DataTypes.STRING,
    get: function () {
      const value = this.getDataValue("changes");
      return JSON.parse(value);
    },
    set: function (val) {
      //val is an array
      console.log(val);
      this.setDataValue("changes", JSON.stringify(val));
    },
    defaultValue: "",
    allowNull: false,
  },
  logAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Log;
