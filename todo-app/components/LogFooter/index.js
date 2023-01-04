import getLogs from "../../utils/logs/getLogs";
import getPageSectionObj from "../../utils/getPageSectionObj";
import styles from "./LogFooter.module.css";

const LogFooter = ({ page, setLogs, setPage }) => {
  const navigateLogs = (page) => {
    getLogs(page).then((result) => {
      setLogs(result.logs);
      setPage(result.page);
    });
  };

  console.log(page.current, page.pageSection);

  // define the page object
  // if page less than 6, show 1-5
  // if page equal to or greater than 6, show page to page + 4
  const page_n = getPageSectionObj(page);
  console.log(page_n);

  return (
    <div className={styles.footer}>
      <button
        onClick={() => navigateLogs(page.current - 1)}
        disabled={page.current < 2 && true}
      >
        Back
      </button>
      <div>
        {page_n.map((p, i) => {
          return (
            <button
              key={i}
              onClick={() => navigateLogs(p)}
              style={{ color: page.current === p ? "#499557" : "#C4C4C4" }}
            >
              {p}
            </button>
          );
        })}
        |<button onClick={() => navigateLogs(page.total)}>{page.total}</button>
      </div>
      <button
        onClick={() => navigateLogs(page.current + 1)}
        disabled={page.current >= page.total && true}
      >
        Next
      </button>
    </div>
  );
};

export default LogFooter;
