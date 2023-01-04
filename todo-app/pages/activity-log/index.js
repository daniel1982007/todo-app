import { useState, useEffect } from "react";
import getLogs from "../../utils/logs/getLogs";
import styles from "./activity-log.module.css";
import logo from "../../public/logo.svg";
import Link from "next/link";
import LogFooter from "../../components/LogFooter";
import moment from "moment";

export default function () {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState({});

  useEffect(() => {
    const getAllLogs = async () => {
      const result = await getLogs(1);
      console.log(result.logs);
      setLogs(result.logs);
      setPage(result.page);
    };

    getAllLogs();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo.src} />
          <h1>Activity Log</h1>
        </div>
        <Link href="/todos" className={styles.todos}>
          To do List
        </Link>
      </div>
      {logs.map((log) => {
        return (
          <div
            key={log.id}
            id={`activity-log-list-item_${log.id}`}
            className={styles.item}
          >
            <div className={styles.recorder}>
              <p
                id={`activity-log-list-item__title_${log.id}`}
                className={styles.title}
              >
                {log.title}
              </p>
              <p
                id={`activity-log-list-item__date-time_${log.id}`}
                className={styles.create_at}
              >
                {moment(new Date(log.createdAt)).format("MMMM Do, h:mm a")}
              </p>
            </div>
            <div className={styles.changes}>
              {log.changes
                .map((change) => {
                  if (change.type === "due") {
                    return {
                      ...change,
                      oldValue: moment(new Date(change.oldValue)).format(
                        "MMMM Do YYYY, h:mm a"
                      ),
                      newValue: moment(new Date(change.newValue)).format(
                        "MMMM Do YYYY, h:mm a"
                      ),
                    };
                  } else if (change.type === "completion") {
                    return {
                      ...change,
                      oldValue: change.oldValue ? "Completed" : "Not Completed",
                      newValue: change.newValue ? "Completed" : "Not Completed",
                    };
                  } else if (change.type === "favorite") {
                    return {
                      ...change,
                      oldValue: change.oldValue ? "Favorited" : "Unfavorited",
                      newValue: change.newValue ? "Favorited" : "Unfavorited",
                    };
                  } else {
                    return change;
                  }
                })
                .map((change, i) => {
                  return (
                    <div key={i}>
                      <span
                        id={`activity-log-list-item__change-type_${log.id}`}
                      >
                        Changed {change.type}
                      </span>
                      <span id={`activity-log-list-item__old-value_${log.id}`}>
                        {" "}
                        from "{change.oldValue}"
                      </span>
                      <span id={`activity-log-list-item__new-value_${log.id}`}>
                        {" "}
                        to "{change.newValue}"
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      {page.total && (
        <LogFooter page={page} setLogs={setLogs} setPage={setPage} />
      )}
    </>
  );
}
