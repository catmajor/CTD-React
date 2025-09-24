import { useRef, useState } from 'react';
import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';
function TodoForm({onAddTodo, isSaving}) {
    const StyledForm = styled.form`
        padding: 12px;
    `;
    const StyledButton = styled.button`
      padding: 8px 16px;
      margin-top: 8px;
      ${(props) => props.disabled && `font-style: italic;`}
    `;
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
            <StyledForm onSubmit = {handleAddTodo}>
                <TextInputWithLabel 
                    elementId = "todoTitle"
                    ref={todoTitleInput} 
                    value = {workingTodoTitle} 
                    onChange = {(e) => setWorkingTodoTitle(e.target.value)}
                    labelText = "Todo"
                />
                <StyledButton type="submit" disabled = {workingTodoTitle === ''}>
                  {isSaving ? "Saving..." : "Add Todo"}
                </StyledButton>
            </StyledForm>
        </div>
    )
}
export default TodoForm
