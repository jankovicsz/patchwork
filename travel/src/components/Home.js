import { useEffect, useState } from "react";
import InputItem from "./InputItem";
import db from "../firebase/db";

export default function Home() {
  const [trip, setTrip] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [boards, setBoards] = useState("");


  useEffect(() => {
    // const unsubscribe = db.collection("vtravel");
    db.collection("vtravel")
      .orderBy("name")
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.docs.forEach((item) => {
          const docItem = item.data();
          docItem.id = item.id;
          items.push(docItem);
        });
        setTrip(items);
      });
    // return () => unsubscribe;
  }, []);

  function handleSelectTrip(e) {
    const { name, value } = e.target;
    const selected = trip.filter((item) => item.name === value)[0];
    setSelectedTrip(selected);
    setSelectedTrip((previousSelectedTrip) => ({
      ...previousSelectedTrip,
      [name]: value,
    }));
  }

  function handleSelectBoards(e) {
    setBoards(e.target.options[e.target.selectedIndex].value);
  }

  return (
    <>
      <h1>VTRAVEL</h1>
      <h2>Utazási szerződés</h2>
      <InputItem
        label="Út"
        type="select"
        name="name"
        value={selectedTrip.name}
        onChange={handleSelectTrip}
        options={trip.map((item) => item.name)}
        /*required={true}
          onBlur={handleBlur}
          reference={references.category}
          errors={errors} */
      />
        <InputItem
          label="Ellátás"
          type="select"
          name="boards"
          onChange={handleSelectBoards}
          options={selectedTrip.boards ? Object.keys(selectedTrip.boards).map((item) => {
            return selectedTrip.boards[item].text;
          }): []}
          /*required={true}
          onBlur={handleBlur}
          reference={references.category}
          errors={errors} */
        />
      <div>{selectedTrip.name}</div>
      {selectedTrip.dates && (
        <div>
          {new Date(
            selectedTrip.dates.departure.seconds * 1000
          ).toLocaleDateString("Hu-hu")}{" "}
          -{" "}
          {new Date(
            selectedTrip.dates.arrival.seconds * 1000
          ).toLocaleDateString("Hu-hu")}
        </div>
      )}
      <div>{selectedTrip.accommodation}</div>
      <div>{selectedTrip.price}</div>
      {boards && <div>{boards}</div>}
      {console.log(boards)}
    </>
  );
}
