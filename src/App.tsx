import { Form } from "./components/Form";
import { TodoList } from "./components/TodoList";
import { Sorting } from "./components/Sorting";

import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <h1 className="title">Manage your todos</h1>
      <Form />
      <Sorting />
      <TodoList />
    </div>
  );
};
