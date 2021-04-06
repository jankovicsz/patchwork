export default function TodoTable({ todo, onClickComplete, onClickDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Todo</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todo.map((item) => (
          <tr key={item.docId}>
            <td className={item.completed ? "completed" : ""}>{item.text}</td>
            <td>
              {item.completed ? (
                <span>Done</span>
              ) : (
                <button
                  id={item.docId}
                  className="btn btn-primary"
                  onClick={onClickComplete}
                >
                  Complete
                </button>
              )}
              <button
                id={item.docId}
                className="btn btn-danger"
                onClick={onClickDelete}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
