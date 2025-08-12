import { useRef } from 'react';
function TodoForm({onAddTodo}) {
    const todoTitleInput = useRef('');
    function handleAddTodo(event) {
        event.preventDefault()
        const title = event.target.title.value
        if (!title.trim()) return
        onAddTodo(title)
        event.target.title.value = ''
        todoTitleInput.current.focus()
    }
    return (
        <div>
            <form onSubmit = {handleAddTodo}>
                <label htmlFor="todoTitle">Todo</label>
                <input type="text" id="todoTitle" name="title" ref={todoTitleInput}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
export default TodoForm