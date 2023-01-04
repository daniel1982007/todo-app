import Todo from "../../../db/models/Todo";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { slug } = req.query;
    const todo = await Todo.findByPk(slug);
    await todo.destroy();
    const todos = await Todo.findAll();
    const pageTotal = Math.ceil(todos.length / 10);
    // res.status(204).end();
    res.status(200).json({ pageTotal });
  }
  if (req.method === "PATCH") {
    const { slug } = req.query;
    const { completed, title, due, favorite } = req.body;
    console.log(due);

    const todo = await Todo.findByPk(slug);
    //get todo page
    const todos = await Todo.findAll();
    const ids = todos.map((todo) => todo.id);
    const todo_index = ids.findIndex((id) => id === parseInt(slug));
    console.log(todo_index);
    const page = Math.ceil((todo_index + 1) / 10);

    const result = {};
    result.todo = todo;
    result.page = page;

    if (completed === undefined && favorite === undefined) {
      todo.title = title;
      todo.due = due;
    } else if (favorite === undefined) {
      todo.completed = completed;
    } else {
      todo.favorite = favorite;
    }

    await todo.save();

    res.status(200).json(result);
  }
}
