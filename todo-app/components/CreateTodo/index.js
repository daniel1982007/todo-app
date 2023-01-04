import styles from "./CreateTodo.module.css";
import Form from "../../components/Form/Form";
import short_text from "../../public/short_text.svg";
import { showFormContext } from "../../context";
import { useState } from "react";

const CreateTodo = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <showFormContext.Provider value={{ showForm, setShowForm }}>
      <div className={styles.create_section}>
        {!showForm ? (
          <div className={styles.create_new} onClick={() => setShowForm(true)}>
            <div className={styles.plus}></div>
            <p>create new item</p>
          </div>
        ) : (
          <div className={styles.create_new_form}>
            <label className={styles.title_label}>
              <img src={short_text.src} />
            </label>
            <Form />
          </div>
        )}
      </div>
    </showFormContext.Provider>
  );
};

export default CreateTodo;
