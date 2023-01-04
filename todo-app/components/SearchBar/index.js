import getSearchTodos from "../../utils/todos/getSearchTodos";
import styles from "./SearchBar.module.css";
import { todosContext } from "../../context";
import { useContext, useState } from "react";

const SearchBar = () => {
  const { setTodos, setPage, search, setSearch } = useContext(todosContext);
  const [timer, setTimer] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    //which page to define
    getSearchTodos(search, 1).then((res) => {
      setTodos(res.todos);
      setPage(res.page);
    });
  };

  const handleRealTimeSearch = async (e) => {
    clearTimeout(timer);

    //e.currentTarget, it is like keyup event
    const realtimeSearchText = e.currentTarget.value;
    let t = setTimeout(() => {
      console.log("running timeout");
      getSearchTodos(realtimeSearchText, 1).then((res) => {
        setTodos(res.todos);
        setPage(res.page);
      });
    }, 350);
    setTimer(t);
  };

  return (
    <form className={styles.search_form} onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onInput={handleRealTimeSearch}
      />
    </form>
  );
};

export default SearchBar;
