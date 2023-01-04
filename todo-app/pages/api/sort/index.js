import Todo from "../../../db/models/Todo";
import getPage from "../../../utils/todos/getPage";

export default async (req, res) => {
  //get the sort req params
  const { category, page, limit } = req.query;
  const limit_int = parseInt(limit);
  const page_int = parseInt(page);
  //sort all objects in the object
  const todos = await Todo.findAll();
  //sort todos
  switch (category) {
    case "title":
      todos.sort((todo_lf, todo_rt) => {
        if (todo_lf.title > todo_rt.title) return 1;
        return -1;
      });
      break;
    case "due":
      todos.sort((todo_lf, todo_rt) => {
        if (new Date(todo_lf.due).getTime() > new Date(todo_rt.due).getTime()) {
          return 1;
        }
        return -1;
      });
      break;
    case "-due":
      todos.sort((todo_lf, todo_rt) => {
        if (new Date(todo_lf.due).getTime() > new Date(todo_rt.due).getTime()) {
          return -1;
        }
        return 1;
      });
      break;
    default:
      break;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const requested_todos = todos.slice(startIndex, endIndex);

  const result = {};
  result.todos = requested_todos;

  //handle page
  const pageObj = getPage(todos, limit_int, page_int);
  result.page = pageObj;

  res.status(200).json(result);
};
