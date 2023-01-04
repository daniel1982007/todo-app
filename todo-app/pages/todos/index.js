import { useState, useEffect } from "react";
import Todo from "../../components/Todo/Todo";
import getTodos from "../../utils/todos/getTodos";
import styles from "./todos.module.css";
import Page from "../../components/Page/Page";
import CreateTodo from "../../components/CreateTodo";
import { todosContext } from "../../context";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState({});
  const [search, setSearch] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  console.log(sortCategory, search);

  useEffect(() => {
    //if you want to use promise inside a useeffect, you need to wrap them
    const get_todos = async () => {
      const result = await getTodos(1);
      setTodos(result.todos);
      setPage(result.page);
    };

    get_todos();
  }, []);

  console.log(page);
  console.log(todos);

  return (
    <todosContext.Provider
      value={{
        todos,
        setTodos,
        page,
        setPage,
        search,
        setSearch,
        sortCategory,
        setSortCategory,
      }}
    >
      <Page>
        <ul className={styles.todo_list}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
        <CreateTodo />
      </Page>
    </todosContext.Provider>
  );
}
