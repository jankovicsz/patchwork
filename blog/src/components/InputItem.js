export default function InputItem({
    type,
    name,
    value,
    label,
    onChange,
    onBlur,
    required,
    reference,
    errors,
    placeholder,
  }) {
    let inputField;
    if (type === "textarea") {
      inputField = (
        <textarea
          className="form-control"
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          ref={reference}
          rows="5" 
          cols="33"
          placeholder={placeholder}
        >
        </textarea>
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
          placeholder={placeholder}
        />
      );
    }
  
    return (
      <div
        className={`mb-2 ${errors[name] !== "" ? "was-validated" : ""}`}
      >
        <label className="form-label mb-2" htmlFor={name}>
          {label}
        </label>
        {inputField}
        <div className="invalid-feedback">{errors[name]}</div>
      </div>
    );
  }