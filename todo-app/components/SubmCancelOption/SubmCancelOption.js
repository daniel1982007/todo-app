import { useContext } from "react";
import getTodos from "../../utils/todos/getTodos";
import addTodo from "../../utils/todos/addTodo";
import close from "../../public/close.svg";
import confirm from "../../public/confirm.svg";
import styles from "./SubmCancelOption.module.css";
import { showFormContext, todosContext } from "../../context";

const SubmCancelOption = ({ title, due, setTitle, setDue }) => {
  const { setShowForm } = useContext(showFormContext);
  const { setTodos, setPage, setSearch, setSortCategory } =
    useContext(todosContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = await addTodo({ title, due });
    console.log(todo);
    const todos = await getTodos(todo.current);
    console.log(todos);
    setTodos(todos.todos);
    setPage(todos.page);
    setTitle("");
    setDue("");
    setShowForm(false);
    setSearch("");
    setSortCategory("");
  };

  return (
    <div className={styles.button_field}>
      <button type="button" onClick={() => setShowForm(false)}>
        <img src={close.src} />
      </button>
      <button type="submit" onClick={handleSubmit}>
        <img src={confirm.src} />
      </button>
    </div>
  );
};

export default SubmCancelOption;
