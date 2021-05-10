import { useState, useEffect } from "react";
//
import "./App.scss";
//
import TableItem from "./components/TableItem";
import RegisterForm from "./components/RegisterForm";
//
import db from "./firebase/db";

function App() {
  const [people, setPeople] = useState([]);
  const [isChecked, setIsChecked] = useState(null);
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("hungarian-people")
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.docs.forEach((person) => {
          const docItem = person.data();
          docItem["docId"] = person.id;

          data.push(docItem);
        });
        setPeople(data);
      });
    return () => {
      unsubscribe();
    };
  }, []);

   useEffect(() => {
    const condition = new Date().getFullYear() - 60;
    const unsubscribe = db
      .collection("hungarian-people")
      .where("yearOfBirth", "<=", condition)
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.docs.forEach((person) => {
          const docItem = person.data();
          docItem["docId"] = person.id;
          if (!docItem.isVaccinated) {
            data.push(docItem);
          }
        });
        setFilteredPersons(data);
      });
    return () => {
      unsubscribe();
    };
  }, [isChecked]); 

  function handleCheckbox(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <>
      <header className={"container mt-4 mb-4"}>
        <h1>Vakcinadmin 💉</h1>
      </header>
      <main className={"container-md"}>
        <section>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="filter"
              name="filter"
              onChange={handleCheckbox}
            />
            <label className="form-check-label mb-3" htmlFor="filter">
              Sürgősen oltandók mutatása
            </label>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Teljes név</th>
                <th>Születési év</th>
                <th>Oltottság állapota</th>
                <th>Email cím</th>
              </tr>
            </thead>
            <tbody>
              {isChecked
                ? filteredPersons.map((person) => (
                    <TableItem
                      key={person.email}
                      fullName={person.fullName}
                      yearOfBirth={person.yearOfBirth}
                      isVaccinated={person.isVaccinated}
                      email={person.email}
                    />
                  ))
                : people.map((person) => (
                    <TableItem
                      key={person.email}
                      fullName={person.fullName}
                      yearOfBirth={person.yearOfBirth}
                      isVaccinated={person.isVaccinated}
                      email={person.email}
                    />
                  ))}
            </tbody>
          </table>
        </section>
        <section>
          <RegisterForm />
        </section>
      </main>
    </>
  );
}

export default App;
