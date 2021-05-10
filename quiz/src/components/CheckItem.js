export default function CheckItem({ onChange, name, label }) {
  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name={name}
          id={name}
          value={name}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={name}>
        {label}
        </label>
      </div>
    </div>
  );
}
