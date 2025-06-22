import { use, useEffect, useState } from "react";
import useStore from "../../store";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const { createTodo, getAllTodos, todos, deleteTodo } = useStore();

  const handelInput = () => {
    createTodo(inputValue);
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  return (
    <div className="flex  w-full h-screen justify-center items-center gap-4">
      <div>
        <input
          type="text"
          value={inputValue}
          className="border-2 py-1 px-4"
          placeholder="create todo here..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 ml-4 bg-green-400 rounded-md text-white"
          onClick={handelInput}
        >
          Create
        </button>
        <div className="text-center mt-10 w-[500px] h-[500px] overflow-scroll">
          {todos.length === 0 ? (
            <span>no item</span>
          ) : (
            todos.map((value, index) => (
              <>
                <div>
                  <span className="w-[50%]" key={index}>
                    {value.title}
                  </span>
                  <button
                    onClick={() => deleteTodo(value._id)}
                    className="px-4 py-2 ml-4 bg-red-400 rounded-md text-white"
                  >
                    Delete
                  </button>
                </div>

                <br />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
