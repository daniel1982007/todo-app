import completeTodo from "./completeTodo";

export default async function (todos, id) {
  const todo = todos.find((todo) => todo.id === id);
  const completed_todo = await completeTodo(id, todo.completed);
  return completed_todo.todo;
}
