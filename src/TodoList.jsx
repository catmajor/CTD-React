import TodoListItem from "./TodoListItem";
function TodoList({todoList}){
    return (
        <div>
            {todoList.length == 0 ? 
                <p>Add todo above to get started</p>
            :
                <ul>
                {todoList.map(todo => 
                <TodoListItem key={todo.id} title={todo.title} />
                )}
            </ul>
            }
        </div>
    );
}

export default TodoList