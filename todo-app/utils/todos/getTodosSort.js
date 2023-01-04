export default async (category, page) => {
  const res = await fetch(
    `http://localhost:3000/api/sort?category=${category}&page=${page}&limit=10`
  );
  const todos = await res.json();
  return todos;
};
