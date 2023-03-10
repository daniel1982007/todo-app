import Todo from "../../../db/models/Todo";
import getPage from "../../../utils/todos/getPage";

export default async (req, res) => {
  //find page number and limit
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  // console.log(page, limit);
  const todos = await Todo.findAll();
  // console.log(todos);
  //find todos subarray
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const requested_todos = todos.slice(startIndex, endIndex);
  // console.log(requested_todos);

  //get result with todos
  const result = {};
  result.todos = requested_todos;
  //get result with page
  const pageObj = getPage(todos, limit, page);
  result.page = pageObj;

  res.status(200).json(result);
};
