const completeTodo = async (id, currentCompletionStatus) => {
  console.log(currentCompletionStatus);
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !currentCompletionStatus,
    }),
  });
  const todo = await response.json();
  return todo;
};

export default completeTodo;
