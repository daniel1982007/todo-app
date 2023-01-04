import { useState, useContext } from "react";
import { todosContext } from "../../context";
import Link from "next/link";
import styles from "./Header.module.css";
import logo from "../../public/logo.svg";
import SearchBar from "../SearchBar";
import getSort from "../../utils/todos/getTodosSort";
import getTodos from "../../utils/todos/getTodos";

const Header = () => {
  const [showSortOption, setShowSortOption] = useState(false);
  const { setTodos, setPage, sortCategory, setSortCategory } =
    useContext(todosContext);

  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "title":
        setSortCategory("title");
        getSort("title", 1).then((res) => {
          setTodos(res.todos);
          setPage(res.page);
        });
        return;
      case "due":
        setSortCategory("due");
        getSort("due", 1).then((res) => {
          setTodos(res.todos);
          setPage(res.page);
        });
        return;
      case "-due":
        setSortCategory("-due");
        getSort("-due", 1).then((res) => {
          setTodos(res.todos);
          setPage(res.page);
        });
        return;
      default:
        setSortCategory("");
        getTodos(1).then((res) => {
          setTodos(res.todos);
          setPage(res.page);
        });
        return;
    }
  };

  return (
    <div>
      <div className={styles.logo}>
        <img src={logo.src} />
        <h1>Todo List</h1>
      </div>
      <div className={styles.search_field}>
        {/* Search bar */}
        <SearchBar />
        <div
          className={styles.sort_box}
          onMouseEnter={(e) => setShowSortOption(true)}
          onMouseLeave={(e) => setShowSortOption(false)}
        >
          <p className={styles.sort_header}>Sort By</p>
          {/* Sorting dropdown */}
          <div
            className={styles.sort}
            style={{ display: showSortOption ? "block" : "none" }}
          >
            <select value={sortCategory} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="title">Title</option>
              <option value="due" aria-selected>
                Due At (Asc)
              </option>
              <option value="-due">Due At (Desc)</option>
            </select>
          </div>
        </div>
        <Link href="/activity-log" className={styles.activity}>
          Activity Log
        </Link>
      </div>
    </div>
  );
};

export default Header;
