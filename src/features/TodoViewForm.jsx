import { useState, useEffect } from 'react';
import styled from 'styled-components';
function TodoViewForm({ sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString }) {
    const StyledForm = styled.form`
      padding: 12px;
    `;
    const StyledInput = styled.input`
      padding: 4px 8px;
      margin-right: 8px;
    `;
    const StyledButton = styled.button`
      padding: 4px 12px;
      margin-left: 4px;
    `;
    const StyledSelect = styled.select`
      padding: 4px 8px;
      margin-right: 8px;
    `;

    const preventRefresh = (e) => { e.preventDefault(); }
    const [localQueryString, setLocalQueryString] = useState(queryString);
    useEffect(() => {
	const debounce = setTimeout(() => {
	    setQueryString(localQueryString);
	}, 500);
	return () => clearTimeout(debounce);
    }, [localQueryString, setQueryString]);
    return (
      <StyledForm onSubmit={preventRefresh}>
  	<div>
  	    <label>Search Todos&nbsp;</label>
  	    <StyledInput type="text" value={localQueryString} onChange={(e) => setLocalQueryString(e.target.value)} />
  	    <StyledButton type="button" onClick={() => setLocalQueryString('')}>Clear</StyledButton>
  	</div>
  	<div>
  	    <label>Sort By&nbsp;</label>
  	    <StyledSelect value={sortField} onChange={(e) => setSortField(e.target.value)}>
  		<option value="title">Title</option>
  		<option value="createdTime">Created Time</option>
  	    </StyledSelect>
  	    <label>Sort Direction&nbsp;</label>
  	    <StyledSelect value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
  		<option value="asc">Ascending</option>
  		<option value="desc">Descending</option>
  	    </StyledSelect>
  	</div>
      </StyledForm>
  );
}
export default TodoViewForm;
