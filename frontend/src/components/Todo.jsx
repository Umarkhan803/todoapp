import { useEffect, useState, useCallback, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../store";

const TodoItem = memo(({ id, title, onDelete }) => (
  <div className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-white/80 shadow-sm hover:shadow transition-shadow">
    <span className="flex-1 truncate text-gray-800">{title}</span>
    <button
      type="button"
      onClick={() => onDelete(id)}
      className="shrink-0 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
      aria-label={`Delete todo: ${title}`}
    >
      Delete
    </button>
  </div>
));

TodoItem.displayName = "TodoItem";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");

  const { createTodo, getAllTodos, todos, deleteTodo, isLoading } = useStore(
    useShallow((state) => ({
      createTodo: state.createTodo,
      getAllTodos: state.getAllTodos,
      todos: state.todos,
      deleteTodo: state.deleteTodo,
      isLoading: state.isLoading,
    }))
  );

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault?.();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      createTodo(trimmed);
      setInputValue("");
    },
    [inputValue, createTodo]
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a todo..."
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            aria-label="New todo"
            autoComplete="off"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            {isLoading ? "..." : "Add"}
          </button>
        </form>
        <div
          className="space-y-2 max-h-80 overflow-y-auto pr-1"
          role="list"
          aria-label="Todo list"
        >
          {todos.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                id={todo._id}
                title={todo.title}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
