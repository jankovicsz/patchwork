export default function InputItem({
  onChange,
  onBlur,
  name,
  labelText,
  value,
  reference,
  error
}) {
  return (
      <div className={`${error && 'was-validated'}`}>
        <label htmlFor={name} className="form-label m-2">
          {labelText}
        </label>
        <input
          type={name}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={reference}
          className="form-control m-2"
        />
        <div className="invalid-feedback">
          {error}
        </div>
      </div>
  );
}
