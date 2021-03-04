
export default function Button2(props) {
  const {counter, onChange} = props;

/*   function handleFunctionButtonChange(counter) {
      return setCounter(counter);
  } */

  return (
    <div>
      <FunctionButton counter={counter} onChange={onChange} />
    </div>
  );
}

function FunctionButton(props) {
    const {counter, onChange } = props;
    return (
        <div className="counter">
        <button type='button' onClick={() => onChange(counter - 1)}>
            Csökkent
          </button>
          <span>{counter}</span>
          <button type='button' onClick={() => onChange(counter + 1)}>
            Növel
          </button>
        </div>
    )
}
