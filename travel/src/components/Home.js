import { useEffect, useState } from "react";
import InputItem from "./InputItem";
import db from "../firebase/db";

export default function Home() {
  const [trip, setTrip] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [services, setServices] = useState({
    rooms: {},
    boards: {},
  });

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
    setServices({
      rooms: {},
      boards: {},
    });
    setSelectedTrip({
      ...selected,
      [name]: value,
      departure: selected === undefined ? '' : new Date(selected.dates.departure.seconds * 1000),
      arrival: selected === undefined ? '' : new Date(selected.dates.arrival.seconds * 1000),
      days: e.target.value === '' ? '' : new Date(
        (selected.dates.arrival.seconds - selected.dates.departure.seconds) *
          1000
      ).getDate(), 
    });
  }

  function handleSelectServices(e) {
    const { name } = e.target;
    const value = e.target.options[e.target.selectedIndex].value;
    const selectedItem = selectedTrip[name].filter(
      (item) => item.text === value
    )[0];
    setServices({
      ...services,
      [name]: selectedItem,
    });
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
        label="Elhelyezés"
        type="select"
        name="rooms"
        onChange={handleSelectServices}
        options={
          selectedTrip.rooms ? selectedTrip.rooms.map((item) => item.text) : []
        }
        /*required={true}
          onBlur={handleBlur}
          reference={references.category}
          errors={errors} */
      />
      <InputItem
        label="Ellátás"
        type="select"
        name="boards"
        onChange={handleSelectServices}
        options={
          selectedTrip.boards
            ? selectedTrip.boards.map((item) => item.text)
            : []
        }
        /*required={true}
          onBlur={handleBlur}
          reference={references.category}
          errors={errors} */
      />
      {selectedTrip.name && <div>Út neve: {selectedTrip.name}</div>}
       {selectedTrip.dates && (
        <div>
          Időpont: {selectedTrip.departure.getFullYear()}.
          {selectedTrip.departure.getMonth() > 8
            ? selectedTrip.departure.getMonth() + 1
            : `0${selectedTrip.departure.getMonth() + 1}`}
          .
          {selectedTrip.departure.getDate() > 9
            ? selectedTrip.departure.getDate()
            : `0${selectedTrip.departure.getDate()}`}
          {" - "}
          {selectedTrip.arrival.getMonth() > 8
            ? selectedTrip.arrival.getMonth() + 1
            : `0${selectedTrip.arrival.getMonth() + 1}`}
          .
          {selectedTrip.arrival.getDate() > 9
            ? selectedTrip.arrival.getDate()
            : `0${selectedTrip.arrival.getDate()}`}
          .
        </div>
      )}
      {selectedTrip.days && (
        <div>
          {selectedTrip.days} nap/ {selectedTrip.days - 1} éj
        </div>
      )} 
      {selectedTrip.accommodation && (
        <div>Szállás: {selectedTrip.accommodation}</div>
      )}
      {services.rooms && services.rooms.text && (
        <div>
          Elhelyezés: {services.rooms.text}{" "}
          {services.rooms.price > 0 && <span> {services.rooms.price} Ft</span>}
        </div>
      )}
      {services.boards && services.boards.text && (
        <div>
          Ellátás: {services.boards.text}{" "}
          {services.boards.price > 0 && (
            <span> {services.boards.price} Ft</span>
          )}
        </div>
      )}
      {services.boards && services.boards.text && (
        <div>Részvételi díj: {selectedTrip.price}</div>
      )}
      {services.boards && services.rooms && services.boards.text && (
        <div>
          Díjak összesen:{" "}
          {selectedTrip.price + services.boards.price + services.rooms.price}
        </div>
      )}
    </>
  );
}
