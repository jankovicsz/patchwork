import { useEffect, useState } from "react";
import db from "../firebase/db";
// import firestore from "../firebase/firestore";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [iconClassDirection, setIconClassDirection] = useState("d-none");

  const [orderColumn, setOrderColumn] = useState("");

  const [orderDirection, setOrderDirection] = useState("asc");

  // const restiCollect = db.collection("test2");

  const getRestaurants = (snapshot) => {
    const items = [];
    snapshot.docs.forEach((item) => {
      const docItem = item.data();
      docItem.docId = item.id;
      items.push(docItem);
    });
    setRestaurants(items);
  };

  useEffect(() => {
    db.collection("test2").limit(20).get().then(getRestaurants);
    /*     return () => {
      listRestaurants();
    }; */
  }, []);

  function handleOnclickOrder(e) {
    const order = e.target.dataset.name;
    setOrderColumn(order);
    if (iconClassDirection === "bi-arrow-up") {
      setIconClassDirection("bi-arrow-down");
      setOrderDirection("desc");
    } else {
      setIconClassDirection("bi-arrow-up");
      setOrderDirection("asc");
    }
    db.collection("test2")
      .orderBy(order, orderDirection)
      .limit(20)
      .get()
      .then(getRestaurants);
  }

  function onSearchChange(e) {
    const searchTerm = e.target.value;
     db.collection("test2")
      .orderBy(orderColumn, orderDirection)
      .limit(20)
      .startAt(searchTerm)
      .endAt(searchTerm + "z")
      .get()
      .then(getRestaurants);
  }

  return (
    <div>
      <h2>Restaurants</h2>
      <div className="input-group mb-3">
        <label className="form-label me-4" htmlFor="search">Search</label>
        <input
          type="text"
          className="form-control"
          id="search"
          onChange={onSearchChange}
        />
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <th
                scope="col"
                data-name="name"
                onClick={handleOnclickOrder}
                className="clickakble"
              >
                Name{" "}
                {orderColumn === "name" && (
                  <i data-name="name" className={`bi ${iconClassDirection}`} />
                )}
              </th>
              <th
                scope="col"
                data-name="borough"
                onClick={handleOnclickOrder}
                className="clickakble"
              >
                Borough{" "}
                {orderColumn === "borough" && (
                  <i data-name="borough" className={`bi ${iconClassDirection}`} />
                )}
              </th>
              <th
                scope="col"
                data-name="cuisine"
                onClick={handleOnclickOrder}
                className="clickakble"
              >
                Cuisine{" "}
                {orderColumn === "cuisine" && (
                  <i data-name="cuisine" className={`bi ${iconClassDirection}`} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((item, ix) => (
              <tr key={item.docId}>
                <td>{ix + 1}</td>
                <td>{item.name}</td>
                <td>{item.borough}</td>
                <td>{item.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
