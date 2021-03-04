import React, { useState, useEffect } from 'react';

export default function ActionLink() {
  // Deklarálj egy új, "count" nevű állapot változót
  const [count, setCount] = useState(0);

  // Hasonló a componentDidMount és componentDidUpdate-hez:
  useEffect(() => {
    // A dokumentum címének frissítése a böngésző API segítségével
    document.title = `${count} alkalommal kattintottál`;
  });

  return (
    <div>
      <p>{count} alkalommal kattintottál.</p>
      <button onClick={() => setCount(count + 1)}>Kattints rám</button>
    </div>
  );
}
