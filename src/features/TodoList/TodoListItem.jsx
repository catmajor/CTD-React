import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
function TodoListItem({todo, onCompleteTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  function handleCancel () {
    setWorkingTitle(todo.title)
    setIsEditing(false)
  }
  return (
    <li>
      {isEditing ? 
        <>
          <TextInputWithLabel value = {todo.title}/>
          <button type = "button" onClick = {() => handleCancel()}>Cancel</button>
        </>
      :
        <form>
          <input type = "checkbox" checked = {todo.isComplete} onChange = {() => onCompleteTodo(todo.id)}></input>
          <span onClick = {() => setIsEditing(true)}>{todo.title}</span>
        </form>
      }
    </li>
  );
}

export default TodoListItem;