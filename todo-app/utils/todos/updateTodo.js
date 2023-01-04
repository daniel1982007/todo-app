const updateTodo = async (id, title, due) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      due,
    }),
  });

  const result = await response.json();
  return result;
};

export default updateTodo;
