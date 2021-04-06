export default function NewTodo({ onSubmit, onChange, value, name }) {
  return (
    <form className="mb-3 new-todo" onSubmit={onSubmit}>
      <label htmlFor="new-todo" className="form-label">
        New Todo
      </label>
      <div className="input-group">
        <input
          type="text"
          name={name}
          id={name}
          className="form-control"
          onChange={onChange}
          value={value}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon"
        >
          Add
        </button>
      </div>
    </form>
  );
}
