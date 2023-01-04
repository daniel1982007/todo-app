import { useEffect, useState, useContext } from "react";
import TodoActions from "../TodoActions/TodoActions";
import check_icon from "../../public/Ellipse.svg";
import checked_icon from "../../public/checked.svg";
import close from "../../public/close.svg";
import confirm from "../../public/confirm.svg";
import styles from "./FormEdit.module.css";
import updateTodo from "../../utils/todos/updateTodo";
import getTodos from "../../utils/todos/getTodos";
import { todosContext } from "../../context";
import handleComplete from "../../utils/todos/handleComplete";
import addLog from "../../utils/logs/addLog";
import moment from "moment";

const FormEdit = ({ todo, setEdit }) => {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const { todos, setTodos, setPage, setSearch, setSortCategory } =
    useContext(todosContext);

  useEffect(() => {
    console.log(todo);
    setTitle(todo.title);
    const timestamp = moment(todo.due).format().slice(0, -9);
    console.log(timestamp);
    const reform_due = new Date(todo.due).toISOString().slice(0, -8);
    console.log(reform_due);
    setDue(timestamp);
  }, []);

  const handleCompleteTodo = async (id) => {
    const completed_todo = await handleComplete(todos, id);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? completed_todo : todo))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated_todo = await updateTodo(todo.id, title, due);
    console.log(updated_todo);
    const updated_todos = await getTodos(updated_todo.page);
    console.log(updated_todos);
    setEdit(false);
    setTodos(updated_todos.todos);
    setPage(updated_todos.page);
    setSearch("");
    setSortCategory("");

    //add update log
    let log;
    if (
      updated_todo.todo.title !== todo.title &&
      updated_todo.todo.due !== todo.due
    ) {
      log = await addLog({
        title: todo.title,
        changes: [
          {
            type: "title",
            oldValue: todo.title,
            newValue: updated_todo.todo.title,
          },
          {
            type: "due",
            oldValue: todo.due,
            newValue: updated_todo.todo.due,
          },
        ],
      });
    } else if (updated_todo.todo.title !== todo.title) {
      log = await addLog({
        title: todo.title,
        changes: [
          {
            type: "title",
            oldValue: todo.title,
            newValue: updated_todo.todo.title,
          },
        ],
      });
    } else if (updated_todo.todo.due !== todo.due) {
      log = await addLog({
        title: todo.title,
        changes: [
          { type: "due", oldValue: todo.due, newValue: updated_todo.todo.due },
        ],
      });
    }

    console.log(log);
  };

  return (
    <form className={styles.form_edit} onSubmit={handleSubmit}>
      <div className={styles.edit_title}>
        <div
          className={styles.check}
          onClick={() => handleCompleteTodo(todo.id)}
        >
          <img src={todo.completed ? checked_icon.src : check_icon.src} />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          style={{
            textDecoration: `${todo.completed ? "line-through" : "none"}`,
          }}
        />
        <TodoActions todo={todo} />
      </div>
      <div className={styles.edit_duetime}>
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
      <div className={styles.submcancel_option}>
        <button type="button" onClick={(e) => setEdit(false)}>
          <img src={close.src} />
        </button>
        <button type="submit">
          <img src={confirm.src} />
        </button>
      </div>
    </form>
  );
};

export default FormEdit;
