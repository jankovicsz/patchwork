export default function InputItem({
  type,
  name,
  value,
  label,
  onChange,
  options,
}) {
  let inputField;
  if (type === "select") {
    inputField = (
      <select
        className="form-select mb-4"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        // onBlur={onBlur}
        // required={required}
        // ref={reference}
      >
        <option value="">--- Válassz! ---</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    inputField = (
      <textarea
        className="form-control mb-4"
        type="text"
        name={name}
        id={name}
        value={value}
        // onChange={onChange}
        // onBlur={onBlur}
        // ref={reference}
        rows="3"
      />
    );
  } else {
    inputField = (
      <input
        className="form-control mb-4"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        /*         onBlur={onBlur}
        required={required}
        ref={reference} */
      />
    );
  }
  return (
    <div>
      <label htmlFor={name} className="form-label mb-2">
        {label}
      </label>
      {inputField}
    </div>
  );
}
