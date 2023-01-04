// import Log from "../../db/models/Log";
export default async function (data) {
  const res = await fetch("/api/logs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const log = await res.json();
  return log;
}
