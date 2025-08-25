import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
function TodoListItem({todo, onCompleteTodo, onUpdateTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  function handleCancel () {
    setWorkingTitle(todo.title)
    setIsEditing(false)
  }
  function handleEdit (event) {
    setWorkingTitle(event.target.value)
  }
  function handleUpdate(event) {
    if (isEditing === false) return
    event.preventDefault()
    onUpdateTodo({...todo, title: workingTitle})
    setIsEditing(false)
  }
  return (
    <li>
      {isEditing ? 
        <>
          <TextInputWithLabel value={workingTitle} onChange={(e) => handleEdit(e)}/>
          <button type="button" onClick={() => handleCancel()}>Cancel</button>
          <button type="button" onClick={(e) => handleUpdate(e)}>Update</button>
        </>
      :
        <form onSubmit={(e) => handleUpdate(e)}>
          <input type="checkbox" checked={todo.isComplete} onChange={() => onCompleteTodo(todo.id)}></input>
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </form>
      }
    </li>
  );
}

export default TodoListItem;