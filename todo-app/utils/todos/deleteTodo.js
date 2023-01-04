const deleteTodo = async (id) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export default deleteTodo;
