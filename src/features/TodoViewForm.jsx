function TodoViewForm({ sortDirection, setSortDirection, sortField, setSortField }) {
    const preventRefresh = (e) => { e.preventDefault(); }
  return (
    <form onSubmit={preventRefresh}>
        <div>
            <label>Sort By&nbsp;</label>
            <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="title">Title</option>
                <option value="createdTime">Created Time</option>
            </select>
            <label>Sort Direction&nbsp;</label>
            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </form>
);
}
export default TodoViewForm;