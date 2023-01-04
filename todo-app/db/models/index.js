// export all models from this file
import Todo from "./Todo";
import Log from "./Log";

Todo.hasMany(Log);
Log.belongsTo(Todo);

export default {
  Todo,
  Log,
};
