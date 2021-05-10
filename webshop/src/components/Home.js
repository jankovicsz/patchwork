import { useEffect, useState } from "react";
import db from "../firebase/db";

export default function Home() {
  const [resti, setResti] = useState([]);
  const [column, setColumn] = useState("name");
  const [order, setOrder] = useState("asc");
  const [arrow, setArrow] = useState("bi-arrow-down");

  function getDataFromDb(snaphot) {
    const items = [];
    snaphot.docs.forEach((doc) => {
      const docData = doc.data();
      docData.id = doc.id;
      items.push(docData);
    });
    setResti(items);
  }

  useEffect(() => {
    const unsubscribe = () => {
      db.collection("resti").orderBy(column, order).onSnapshot(getDataFromDb);
    };
    return unsubscribe();
  }, [column, order]);

  function handleOrderTable(e) {
    const value = e.target.dataset.name;
    if (value === column) {
      setOrder(order === "asc" ? "desc" : "asc");
      setArrow(arrow === "bi-arrow-down" ? "bi-arrow-up" : "bi-arrow-down");
    } else {
      setColumn(value);
      setOrder("asc");
      setArrow("bi-arrow-down");
    }
  }

  function onSearchChange(e) {
    const searchTerm = e.target.value;
     db.collection("resti")
      .orderBy(column, order)
      .startAt(searchTerm)
      .endAt(searchTerm + "z")
      .get()
      .then(getDataFromDb);
  }

  return (
    <>
      <h1 className="mt-4 mb-4 table-header">TableSome</h1>
      <label htmlFor="search" className="form-label">Search</label>
    <input
    className="form-control"   
    type="text"
    id="search"
    name="search"
    label="Search"
    onChange={onSearchChange}
    />
      <table className="mt-4 table table-striped table-bordered">
        <thead>
          <tr>
            <th className="number">Nr</th>
            <th className="name" onClick={handleOrderTable} data-name="name">
              Name{" "}
              <i
                className={`${
                  column === "name" ? "" : "d-none"
                }  "bi" ${arrow}`}
                data-name="name"
              />
            </th>
            <th
              className="borough"
              onClick={handleOrderTable}
              data-name="borough"
            >
              Borough{" "}
              <i
                className={`${
                  column === "borough" ? "" : "d-none"
                }  "bi" ${arrow}`}
                data-name="borough"
              />
            </th>
            <th
              className="cuisine"
              onClick={handleOrderTable}
              data-name="cuisine"
            >
              Cuisine{" "}
              <i
                className={`${
                  column === "cuisine" ? "" : "d-none"
                }  "bi" ${arrow}`}
                data-name="cuisine"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {resti.map((item, ix) => (
            <tr key={item.id}>
              <td>{ix + 1}. </td>
              <td>{item.name}</td>
              <td>{item.borough}</td>
              <td>{item.cuisine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
