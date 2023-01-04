import { useState } from "react";
import TodoTitle from "../TodoTitle/TodoTitle";
import FormEdit from "../FormEdit/FormEdit";

const Todo = ({ todo }) => {
  const [edit, setEdit] = useState(false);

  return (
    <li>
      {edit ? (
        <FormEdit todo={todo} setEdit={setEdit} />
      ) : (
        <TodoTitle todo={todo} setEdit={setEdit} />
      )}
    </li>
  );
};

export default Todo;
