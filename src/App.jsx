import {useState, useEffect} from 'react'

import './App.css'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/s${import.meta.env.VITE_TABLE_NAME}`
  const token = `Bearer ${import.meta.env.VITE_PAT}`
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }
      try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.error.message);
        }
        const fetchedExamples = data.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList([...fetchedExamples]);
      } catch (error) {
        setErrorMessage(error.message);
        console.error('error:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [])
  async function addTodo(title) {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
    setTodoList([...todoList, newTodo])
  }
  function completeTodo(id) {
    const updatedTodo = todoList.map(ele => {
      if (ele.id === id) return {...ele, isCompleted: true}
      return ele
    });
    setTodoList(updatedTodo);
  }
  function updateTodo(editedTodo) {
    const updatedTodo = todoList.map(ele => {
      if (ele.id === editedTodo.id) return {...editedTodo}
      return ele
    });
    setTodoList(updatedTodo);
  }
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}/>
      { errorMessage ? 
        <>
        <hr/>
        <p>{errorMessage}</p>
        <button onClick={() => {setErrorMessage("")}}>Clear</button>
        </>
      : <></>}
    </>
  );
}

export default App