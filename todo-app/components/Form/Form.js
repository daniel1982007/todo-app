import { useState } from "react";
import styles from "./Form.module.css";
import SubmCancelOption from "../SubmCancelOption/SubmCancelOption";

const Form = () => {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  return (
    <form className={styles.submission}>
      <div className={styles.title_field}>
        <input
          type="text"
          className={styles.title_input}
          placeholder="Enter Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </div>
      <div className={styles.duetime_field}>
        <input
          type="datetime-local"
          className={styles.datetime}
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <SubmCancelOption
          title={title}
          due={due}
          setTitle={setTitle}
          setDue={setDue}
        />
      </div>
    </form>
  );
};

export default Form;
