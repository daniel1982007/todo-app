import { useState, useEffect, useContext } from "react";
import check_icon from "../../public/Ellipse.svg";
import checked_icon from "../../public/checked.svg";
import handleComplete from "../../utils/todos/handleComplete";
import addLog from "../../utils/logs/addLog";
import TodoActions from "../../components/TodoActions/TodoActions";
import styles from "./TodoTitle.module.css";
import { todosContext } from "../../context";

const TodoTitle = ({ todo, setEdit }) => {
  const [isTodoActionShow, setIsTodoActionShow] = useState(false);
  const [overdue, setOverdue] = useState(false);
  const { todos, setTodos } = useContext(todosContext);

  useEffect(() => {
    const diff = +new Date(todo.due).getTime() - new Date().getTime();
    let duetimer;
    if (diff < 0) {
      setOverdue(true);
    } else {
      duetimer = setTimeout(() => {
        console.log("run");
        setOverdue(true);
      }, +new Date(todo.due).getTime() - new Date().getTime());
    }
    return () => clearTimeout(duetimer);
  }, []);

  const handleCompleteTodo = async (id) => {
    const completed_todo = await handleComplete(todos, id);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? completed_todo : todo))
    );

    //add complete log
    const log = await addLog({
      title: todo.title,
      changes: [
        {
          type: "completion",
          oldValue: todo.completed,
          newValue: completed_todo.completed,
        },
      ],
    });
    console.log(log);
  };

  return (
    <div
      className={styles.todo_title}
      style={{
        backgroundColor: overdue ? "#ffdfdf" : "",
        textDecoration: todo.completed ? "line-through" : "none",
      }}
      onMouseEnter={() => setIsTodoActionShow(true)}
      onMouseLeave={() => setIsTodoActionShow(false)}
    >
      <div className={styles.check} onClick={() => handleCompleteTodo(todo.id)}>
        <img src={!todo.completed ? check_icon.src : checked_icon.src} />
      </div>
      <p className={styles.title_text} onClick={() => setEdit(true)}>
        {todo.title}
      </p>
      {(isTodoActionShow || todo.favorite) && <TodoActions todo={todo} />}
    </div>
  );
};

export default TodoTitle;
