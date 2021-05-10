export default function RadioItem({ name, onChange, value, goodAnswer, label }) {
    return (
      <>
        <div className="form-check">
          <input
            className="form-check-input"
            type='radio'
            name={name}
            id={value}
            value={value}
            checked={value === goodAnswer}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={value}>
          {label}
          </label>
        </div>
      </>
    );
  }
  