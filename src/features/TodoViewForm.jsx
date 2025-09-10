function TodoViewForm() {
  return (
    <div>
        <label>Sort By&nbsp;</label>
        <select>
            <option value="title">Title</option>
            <option value="createdTime">Created Time</option>
        </select>
        <label>Sort Direction&nbsp;</label>
        <select>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>
);
}
export default TodoViewForm;