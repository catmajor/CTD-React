import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
function App() {
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm/>
      <TodoList/>
    </>
  );
}

export default App