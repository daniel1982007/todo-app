export default async function (page) {
  const response = await fetch(`/api/logs?page=${page}&limit=7`);
  const logs = await response.json();
  return logs;
}
