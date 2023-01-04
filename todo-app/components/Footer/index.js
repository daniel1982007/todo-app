import { useContext, useEffect, useState } from "react";
import { todosContext } from "../../context";
import getPageSectionObj from "../../utils/getPageSectionObj";
import getSearchTodos from "../../utils/todos/getSearchTodos";
import getTodos from "../../utils/todos/getTodos";
import getTodosSort from "../../utils/todos/getTodosSort";
import styles from "./Footer.module.css";

const Footer = () => {
  //useContext is observing the data container if there is any change
  const { page, setPage, setTodos, search, sortCategory } =
    useContext(todosContext);
  const [page_n, setPage_n] = useState([]);

  useEffect(() => {
    const p = getPageSectionObj(page);
    setPage_n(p);
  }, [page]);

  const navigatePages = (page) => {
    if (!search && !sortCategory) {
      getTodos(page).then((result) => {
        setTodos(result.todos);
        setPage(result.page);
      });
    } else if (!sortCategory) {
      getSearchTodos(search, page).then((result) => {
        console.log(result.page);
        setTodos(result.todos);
        setPage(result.page);
      });
    } else if (!search) {
      getTodosSort(sortCategory, page).then((result) => {
        setTodos(result.todos);
        setPage(result.page);
      });
    } else {
      console.log(12345);
    }
  };

  console.log(page_n);
  console.log(page);

  return (
    <>
      {page.total ? (
        <div className={styles.button_nav}>
          <button
            onClick={() => navigatePages(page.previous)}
            disabled={page.previous === undefined && true}
          >
            Back
          </button>
          <div className={styles.button_num}>
            {page_n.map((p, i) => {
              return (
                <button
                  key={i}
                  style={{
                    color: p === page.current ? "#499557" : "#C4C4C4",
                    textDecoration: p === page.current ? "underline" : "none",
                  }}
                  disabled={p === "..." ? true : false}
                  onClick={() => navigatePages(p)}
                >
                  {p}
                </button>
              );
            })}
            |
            <button onClick={() => navigatePages(page.total)}>
              {page.total}
            </button>
          </div>
          <button
            onClick={() => navigatePages(page.next)}
            disabled={page.next === undefined && true}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
