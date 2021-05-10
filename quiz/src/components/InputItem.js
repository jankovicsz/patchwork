export default function InputItem({onChange, dataName, id, name, type, value, label}) {
  return (
    <div>
      <label htmlFor="question" className="form-label mt-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        className="form-control"
        value={value}
        data-name={dataName}
      />
    </div>
  );
}
