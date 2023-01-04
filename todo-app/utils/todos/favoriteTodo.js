const favoriteTodo = async (id, currentFavoriteStatus) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: !currentFavoriteStatus,
    }),
  });

  const todo = await response.json();
  return todo;
};

export default favoriteTodo;
