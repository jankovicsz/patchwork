import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  const [attractions, setAttractions] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [selectedSettlement, setSelectedSettlement] = useState();

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = () =>
    db.collection("attractions").onSnapshot((snapshot) => {
        const items = [];
        const cities = new Set();
        snapshot.forEach((doc) => {
          const docObj = doc.data();
          docObj.id = doc.id;
          cities.add(docObj.settlement);
          items.push(docObj);
        });
        setAttractions(items);
        setSettlements(Array.from(cities));
      });
    return unsubscribe();
  }, []);


  function handleDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    db.collection("attractions")
      .doc(id)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  function handleModify(e) {
    const id = e.target.dataset.id;
    history.push(`/attraction/edit/${id}`);
  }

  function handleFilterChange(e) {
    const select = e.target.value;
    setSelectedSettlement(select);
    const handleSnapshot = (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        const docObj = doc.data();
        docObj.id = doc.id;
        items.push(docObj);
      });
      setAttractions(items);
    };
    if (select !== "") {
      db.collection("attractions")
        .where("settlement", "==", select)
        .onSnapshot(handleSnapshot);
    } else {
      db.collection("attractions").onSnapshot(handleSnapshot);
    }
  }

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Látványosságok</h1>
      <Link to="/attraction/new">
        <button className="btn btn-primary mb-4" type="button">
          Felvitel
        </button>
      </Link>
      <form>
        <label className="form-label" htmlFor="settlement-filter">
          Város
          <select
            className="form-select mt-2 mb-4"
            id="settlement-filter"
            onChange={handleFilterChange}
            value={selectedSettlement}
          >
            <option value="">Mindegyik</option>
            {settlements.map((settlement) => (
              <option key={settlement} value={settlement}>
                {settlement}
              </option>
            ))}
          </select>
        </label>
      </form>
      <table className="mb-4 table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Megnevezés</th>
            <th scope="col">Település</th>
            <th scope="col">Cím</th>
            <th scope="col">Kategória</th>
            <th scope="col">Ár</th>
            <th scope="col">Megjegyzés</th>
            <th scope="col">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map((attraction) => (
            <tr key={attraction.id}>
              <td>{attraction.name}</td>
              <td>{attraction.settlement}</td>
              <td>{attraction.address}</td>
              <td>{attraction.category}</td>
              <td>{attraction.price}</td>
              <td>{attraction.note}</td>
              <td>
                {/* <Link to={`/attraction/edit/${attraction.id}`}> */}
                <button
                  type="button"
                  data-id={attraction.id}
                  className="btn btn-primary"
                  onClick={handleModify}
                >
                  Módosítás
                </button>
                {/* </Link> */}
                <button
                  type="button"
                  className="ms-2 btn btn-danger"
                  data-id={attraction.id}
                  onClick={handleDelete}
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
