import { useRef, useState } from 'react';
function TodoForm({onAddTodo}) {
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
                <label htmlFor="todoTitle">Todo</label>
                <input type="text" id="todoTitle" name="title" ref={todoTitleInput} value = {workingTodoTitle} onChange = {(e) => setWorkingTodoTitle(e.target.value)}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
export default TodoForm