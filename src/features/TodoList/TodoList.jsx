import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';
function TodoList({todoList, onCompleteTodo, onUpdateTodo, isLoading}){
    const filteredTodoList = todoList.filter((ele) => ele.isCompleted === false)
    return (
        <div>
            {todoList.length == 0 ? 
                (
                    isLoading ? <p>Loading todos...</p> : <p>Add todo above to get started</p>
                )
            :
                <ul className={styles.ulNoPadding}>
                {filteredTodoList.map(todo => 
                <TodoListItem key={todo.id} todo={todo} onCompleteTodo = {onCompleteTodo} onUpdateTodo = {onUpdateTodo}/>
                )}
            </ul>
            }
        </div>
    );
}

export default TodoList
