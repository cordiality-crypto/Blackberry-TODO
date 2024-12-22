import { useContext, useState} from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "../context/context";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [editId, setEditId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  function handleChange(e, id) {
    const { checked } = e.target;
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: checked } : todo
      )
    );
  }
  function handleEdit(todo) {
    setEditId(todo.id);
    setValue("text", todo.text);
  }
  function handleEditSubmit(data) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: data.text } : todo
      )
    );
    setEditId(null);
    reset();
  }
  function handleDelete(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => handleChange(e, todo.id)}
            />
            {editId === todo.id ? (
              <form onSubmit={handleSubmit(handleEditSubmit)}>
                <input
                  type="text"
                  {...register("text", {
                    required: { value: true, message: "Input cannot be empty!" },
                    minLength: { value: 3, message: "Input is too short!" },
                  })}
                />
                <button type="submit">SAVE</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    reset();
                  }}
                >
                  CANCEL
                </button>
                {errors?.text && <span>{errors.text.message}</span>}
              </form>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "",
                  }}
                  id="todo-text"
                >
                  {todo.text}
                </span>
                <button type="button" onClick={() => handleEdit(todo)}>
                  EDIT
                </button>
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  DELETE
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
