import {useState, useEffect} from 'react'

import './App.css'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
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
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
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
    try {
      setIsSaving(true)
      const resp = await fetch(url, options)
      if (!resp.ok) {
        new Error(resp.statusText)
      }
      const {records} = await resp.json()
      const { id, fields } = records[0];
      const savedTodo = {
        id,
        ...fields,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }
  async function completeTodo(id) {
    const completeTodo = todoList.find((todo) => todo.id === id);
    const updateTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(updateTodoList);
    setIsSaving(true);

    const payload = {
      records: [
        {
          id: completeTodo.id,
          fields: {
            title: completeTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo completion...`);
      const revertedTodos = todoList.map((todo) =>
        todo.id === completeTodo.id ? completeTodo : todo
      );
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const updatedTodoList = todoList.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodoList(updatedTodoList);
    setIsSaving(true);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
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