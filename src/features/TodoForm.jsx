import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
function TodoForm({onAddTodo, isSaving}) {
    const todoTitleInput = useRef('');
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');
    function handleAddTodo(event) {
        event.preventDefault()
        onAddTodo(workingTodoTitle)
        setWorkingTodoTitle('')
        todoTitleInput.current.focus()
    }
    return (
        <div>
            <form onSubmit = {handleAddTodo}>
                <TextInputWithLabel 
                    elementId = "todoTitle"
                    ref={todoTitleInput} 
                    value = {workingTodoTitle} 
                    onChange = {(e) => setWorkingTodoTitle(e.target.value)}
                    labelText = "Todo"
                />
                <button type="submit" disabled = {workingTodoTitle === ''}>{isSaving ? "Saving..." : "Add Todo"}</button>
            </form>
        </div>
    )
}
export default TodoForm