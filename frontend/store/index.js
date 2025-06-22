import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  // State
  todos: [],
  // Actions
  createTodo: async (title) => {
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        title,
      });
      if (response.status === 201) {
        await useStore.getState().getAllTodos();
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllTodos: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      if (response.status === 200) {
        set(() => ({
          todos: [...response.data],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );
      if (response.status === 200) {
        await useStore.getState().getAllTodos();
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateTodo: async (id, title) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        {
          title,
        }
      );
      console.log(response);
      await useStore.getState().getAllTodos();
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useStore;
// This store manages the state of the todo list.
