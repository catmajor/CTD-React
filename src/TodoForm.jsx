function TodoForm() {
    return (
        <div>
            <form>
                <label htmlFor="todoTitle">Todo</label>
                <input type="text" id="todoTitle" />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
export default TodoForm