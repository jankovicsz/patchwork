export default function InputItem({name, type, onChange, onBlur, value, references, required, label, errors }) {
    return (
        <>
        <div className={`mb-3 ${errors !== "" ? "was-validated" : ""}`}>
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
        <input
          className="form-control mb-2"
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={references}
          required={required}
        />
        <div className="invalid-feedback">{errors}</div>
      </div>
      </>
    )
}