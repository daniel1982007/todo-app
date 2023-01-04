const getTodos = async (page) => {
  console.log(page);

  const response = await fetch(
    `http://localhost:3000/api/todos?page=${page}&limit=10`
  );
  const result = await response.json();
  console.log(result);
  return result;
};

export default getTodos;
