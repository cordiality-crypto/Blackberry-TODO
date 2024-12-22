import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import { TodosContext } from "./context/context";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setTodos((todos) => {
      const updatedTodos = [...todos, { text: data.text, isCompleted: false, id: uuidv4() }];
      return updatedTodos;
    });
    reset();
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="title">BLACKBERRY TODO APP</div>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <div className="todos">
          <div className="add-todo">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("text", {
                  required: { value: true, message: "Input cannot be empty!" },
                  minLength: { value: 3, message: "Input is too short!" },
                })}
                placeholder="Add Task"
                autoComplete="off"
              />
              <input type="submit" hidden />
              <label>
                <button type="submit">ADD</button>
              </label>
              {errors.text && <span>{errors.text.message}</span>}
            </form>
          </div>
          <TodoList />
        </div>
      </TodosContext.Provider>
      <footer className="footer">
        Created by <a href="https://github.com/cordiality-crypto">Herzlichkeit</a>
      </footer>
    </>
  );
}
