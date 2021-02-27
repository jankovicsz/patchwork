import { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [count, setCount] = useState(1);
  const [selecedToppings, setselecedToppings] = useState([]);
  const [user, setUser] = useState(null)
  let userId = 1;

  useEffect(() => {
    fetch('https://60381e5d4e3a9b0017e92cc3.mockapi.io/api/users/' + userId)
    .then(res => res.json())
    .then(user => setUser(user))
  }, [userId]);

  function handleItemCountChange(count) {
    setCount(count);
  }

  function handleSelectedToppingsChange(topping, checked) {
    if (checked) {
      setselecedToppings([...selecedToppings, topping])
    } else {
      setselecedToppings(selecedToppings.filter(t => t !== topping))
    }
  }

  return (
    <div className="container">
      <h1>Your Order</h1>
      {user && (
        <div>Welcome {user.name}!</div>
      )}
      <ItemCount count={count} onChange={handleItemCountChange} />
      <ToppingSelector onChange={handleSelectedToppingsChange} />
      <OrderSummary count={count} />
      <OrderToppings selectedToppings={selecedToppings} />
    </div>
  )
}

function ItemCount(props) {
  // let count = props.count;
  const { count, onChange } = props;

  return (
    <div className="form-item-count">
      <button type="button" onClick={() => onChange(count + 1)}>+</button>
      <span>{count}</span>
      <button type="button" onClick={() => {
        if (count > 0) {
          onChange(count - 1)
        }
      }}>-</button>
      <div className="inline-title">Hamburger</div>
    </div>
  )
}

function OrderSummary(props) {
  const { count } = props;
  return (
    <div className="mt-4">
      <h2>Order Summary</h2>
      <div>{count} hamburger</div>
    </div>
  )
}

function ToppingSelector(props) {
  const {onChange} = props;
  const toppings = ['+ Hagyma', '+ Ketchup', '+ Mustár']

  return (
    <div className="mt-4">
      {toppings.map(topping => (
        <div className="form-check" key={topping}>
          <input
          type="checkbox"
          value={topping}
          id={topping}
          className="form-check-input"
          onChange={e => onChange(topping, e.target.checked)}
          />
          <label htmlFor="{topping}">{topping}</label>
        </div>
      ))}
    </div>
  )
}

function OrderToppings(props) {
  const { selectedToppings } = props;
  return (
    <div>
      <ul>
        {selectedToppings.map(topping => (
          <li  key={topping}>{topping}</li>
        ))}
      </ul>
    </div>
  )

}