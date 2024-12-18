import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTodo, deleteTodo } from "../../app/features/todo/todoSlice";

const Todo = () => {
  const { todos } = useSelector((state) => state.kajkam);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTodoCreate = (e) => {
    e.preventDefault();

    dispatch(createNewTodo(input));
    setInput({ name: "", status: "Pending" });
  };

  const handleTodoDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <form onSubmit={handleTodoCreate} className="p-5 shadow-md mb-5">
        <div className="">
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            placeholder="Todo Name"
          />
        </div>
        <div>
          <select
            name="status"
            id=""
            value={input.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Procesing">Procesing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="p-2 bg-red-500 rounded-md text-white"
          >
            Create
          </button>
        </div>
      </form>
      <hr />
      <h3 className="text-3xl font-bold">All todos</h3>
      <hr />
      <ul>
        {todos.map((item) => {
          return (
            <li
              className="p-3 shadow-sm my-1 flex justify-between"
              key={item.id}
            >
              -{item.name}
              <button
                onClick={() => handleTodoDelete(item.id)}
                className="p-2 bg-red-500 text-white "
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
