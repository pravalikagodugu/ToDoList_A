import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo";

const App = () => {
  return <TodoList />;
};
function App() {
  const headerStyle = { textAlign: "center", margin: "20px 0" };

  return (
    <div>
      <h1 style={headerStyle}>Todo List</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
