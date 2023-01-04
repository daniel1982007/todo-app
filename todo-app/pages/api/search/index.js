import { Op } from "sequelize";
import Todo from "../../../db/models/Todo";
import getPage from "../../../utils/todos/getPage";

export default async (req, res) => {
  //get params from url
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const text = req.query.q;

  const todos = await Todo.findAll({
    where: {
      title: {
        [Op.substring]: text,
      },
    },
  });

  //find index
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const requested_todos = todos.slice(startIndex, endIndex);

  //get result object with todos
  const result = {};
  result.todos = requested_todos;

  //get result object with page
  const pageObj = getPage(todos, limit, page);
  // const pageObj = {};
  result.page = pageObj;

  res.status(200).json(result);
};
