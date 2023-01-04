import Log from "../../../db/models/Log";
import getPage from "../../../utils/todos/getPage";

export default async function (req, res) {
  if (req.method === "GET") {
    const p = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const logs = await Log.findAll();
    //get sliced logs
    const startIndex = (p - 1) * limit;
    const endIndex = p * limit;
    const req_logs = logs.slice(startIndex, endIndex);
    //get page object
    const page = getPage(logs, limit, p);
    //return
    const result = {};
    result.logs = req_logs;
    result.page = page;
    res.status(200).json(result);
  } else if (req.method === "POST") {
    const { title, changes } = req.body;
    console.log(changes);
    const log = await Log.create({ title, changes });
    // const logs = await Log.findAll();
    // logs.forEach(async (log) => await log.destroy());

    res.status(200).json(log);
  }
}
