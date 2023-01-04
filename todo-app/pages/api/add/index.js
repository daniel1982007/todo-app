import Todo from "../../../db/models/Todo";

export default async (req, res) => {
  const { title, due } = req.body;
  const todo = await Todo.create({ title, due });
  const todos = await Todo.findAll();
  const total = Math.ceil(todos.length / 10);
  const new_todo = {};
  new_todo.todo = todo;
  new_todo.current = total;
  res.status(201).json(new_todo);
};
