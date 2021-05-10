export default function InputItem({
  type,
  name,
  value,
  label,
  onChange,
  onBlur,
  options,
  required,
  reference,
  errors,
}) {
  let inputField;
  if (type === "select") {
    inputField = (
      <select
        className="form-select"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        ref={reference}
      >
        <option value="">Válassz</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    );
  } else {
    inputField = (
      <input
        className="form-control"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        ref={reference}
      />
    );
  }

  return (
    <div
      className={`mb-4 ${errors[name] !== "" ? "was-validated" : ""}`}
    >
      <label className="form-label mb-2" htmlFor={name}>
        {label}
      </label>
      {inputField}
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
}
