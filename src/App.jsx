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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => { 
    setTodos((todos) => {
      const updatedTodos = [...todos, { text: data.text, isCompleted: false, id: uuidv4() }];
      return updatedTodos;
    });
  };  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div className="title">BLACKBERRY TODO APP</div>
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
    </TodosContext.Provider>
    </>
  );
}