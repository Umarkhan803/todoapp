import Todo from "./components/Todo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Todo />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
