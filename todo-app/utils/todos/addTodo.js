const addTodo = async ({ title, due }) => {
  const res = await fetch("http://localhost:3000/api/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, due }),
  });

  const todo = await res.json();
  return todo;
};

export default addTodo;
