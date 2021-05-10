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
  errors
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
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text ? option.text : option.value}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    inputField = (
      <textarea
        className="form-control"
        ref={reference}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows="3"
      />
    );
  } else {
    inputField = (
      <input
        className="form-control"
        ref={reference}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    );
  }

  return (
    <div className={`mb-4 ${errors[name] !== '' ? "was-validated" : ""}`}>
      <label className="form-label mb-2" htmlFor={name}>
        {label}
      </label>
      {inputField}
      <div className="invalid-feedback">
        {errors[name]}
      </div>
    </div>
  );
}
