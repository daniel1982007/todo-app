import { Sequelize } from "sequelize";

const db = new Sequelize("sqlite:todo.db");
db.sync({ alter: true });

export default db;
