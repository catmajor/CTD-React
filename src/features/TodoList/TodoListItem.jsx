import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
function TodoListItem({todo, onCompleteTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li>
      {isEditing ? 
        <TextInputWithLabel value = {todo.title}/>
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