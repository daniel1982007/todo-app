const getSearchTodos = async (text, page) => {
  console.log(text, page);
  const res = await fetch(
    `http://localhost:3000/api/search?q=${text}&page=${page}&limit=10`
  );
  const todos_obj = await res.json();
  console.log(todos_obj);
  return todos_obj;
};

export default getSearchTodos;
