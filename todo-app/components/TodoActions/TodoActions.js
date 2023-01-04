import { useState, useContext } from "react";
import duplicate_icon from "../../public/Duplicate.svg";
import duplicated_icon from "../../public/duplicated.svg";
import star_icon from "../../public/Star.svg";
import starred_icon from "../../public/starred.svg";
import delete_icon from "../../public/delete.svg";
import deleted_icon from "../../public/deleted.svg";
import deleteTodo from "../../utils/todos/deleteTodo";
import favoriteTodo from "../../utils/todos/favoriteTodo";
import styles from "./TodoActions.module.css";
import getTodos from "../../utils/todos/getTodos";
import { todosContext } from "../../context";
import addTodo from "../../utils/todos/addTodo";
import addLog from "../../utils/logs/addLog";

const TodoActions = ({ todo }) => {
  const [hoverDuplicate, setHoverDuplicate] = useState(false);
  const [hoverFavorite, setHoverFavorite] = useState(false);
  const [hoverDel, setHoverDel] = useState(false);
  const { setTodos, setPage, page } = useContext(todosContext);

  const handleDelete = async (id) => {
    console.log(todo, id);
    const { pageTotal } = await deleteTodo(id);
    if (page.current > pageTotal) {
      const result = await getTodos(pageTotal);
      setTodos(result.todos);
      setPage(result.page);
    } else {
      const result = await getTodos(page.current);
      setTodos(result.todos);
      setPage(result.page);
    }
  };

  const handleFavorite = async (id, favorite) => {
    const favorite_todo = await favoriteTodo(id, favorite);
    console.log(favorite_todo);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? favorite_todo.todo : todo))
    );
    // add favorite log
    const log = await addLog({
      title: todo.title,
      changes: [
        {
          type: "favorite",
          oldValue: todo.favorite,
          newValue: favorite_todo.todo.favorite,
        },
      ],
    });
    console.log(log);
  };

  const handleCopy = async () => {
    const new_todo = await addTodo(todo);
    const todos = await getTodos(new_todo.current);
    setTodos(todos.todos);
    setPage(todos.page);
  };

  return (
    <div className={styles.actions}>
      <button
        type="button"
        onClick={handleCopy}
        onMouseEnter={(e) => setHoverDuplicate(true)}
        onMouseLeave={(e) => setHoverDuplicate(false)}
      >
        <img src={!hoverDuplicate ? duplicate_icon.src : duplicated_icon.src} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          handleFavorite(todo.id, todo.favorite);
        }}
        onMouseEnter={(e) => setHoverFavorite(true)}
        onMouseLeave={(e) => setHoverFavorite(false)}
      >
        <img
          src={
            !hoverFavorite && !todo.favorite ? star_icon.src : starred_icon.src
          }
        />
      </button>
      <button
        type="button"
        onClick={() => handleDelete(todo.id)}
        onMouseEnter={(e) => setHoverDel(true)}
        onMouseLeave={(e) => setHoverDel(false)}
      >
        <img src={!hoverDel ? delete_icon.src : deleted_icon.src} />
      </button>
    </div>
  );
};

export default TodoActions;
