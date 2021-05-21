import { useState } from "react";
import InputItem from "./InputItem";
import db from "../firebase/db";

export default function NewTrip() {
  const [inputFields, setInputFields] = useState({
    name: "",
    departure: "",
    arrival: "",
    accommodation: "",
    price: "",
    singleRoomPrice: "",
    halfBoardPrice: "",
  });
  function handleOnChange(e) {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputFields);
    db.collection("vtravel")
      .add({
        name: inputFields.name,
        dates: {
          departure: new Date(inputFields.departure),
          arrival: new Date(inputFields.arrival),
        },
        accommodation: inputFields.accommodation,
        price: parseInt(inputFields.price),
        rooms: {
          singleRoom: {
            text: "Egyágyas szoba",
            price: parseInt(inputFields.singleRoomPrice),
          },
          doubleRoom: {
            text: "Kétágyas szoba",
            price: 0,
          },
          tripleRoom: {
            text: "Háromágyas szoba",
            price: 0,
          },
        },
        boards: {
          breakfast: {
            text: "reggeli",
            price: 0,
          },
          halfBoard: {
            text: "félpanzió",
            price: parseInt(inputFields.halfBoardPrice),
          },
        },
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setInputFields({
      name: "",
      departure: "",
      arrival: "",
      accommodation: "",
      price: "",
      singleRoomPrice: "",
      halfBoardPrice: "",
    });
  }

  return (
    <div className="container">
      <h1>VTRAVEL</h1>
      <h2>Új út felvitele</h2>
      <form onSubmit={handleSubmit}>
        <InputItem
          type="text"
          name={"name"}
          value={inputFields.name}
          label={"Az út neve"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"departure"}
          value={inputFields.departure}
          label={"Indulás"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"arrival"}
          value={inputFields.arrival}
          label={"Érkezés"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"accommodation"}
          value={inputFields.accommodation}
          label={"Szállás"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"price"}
          value={inputFields.price}
          label={"Ár"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"singleRoomPrice"}
          value={inputFields.singleRoomPrice}
          label={"Egyágyas felár"}
          onChange={handleOnChange}
        />
        <InputItem
          type="text"
          name={"halfBoardPrice"}
          value={inputFields.halfBoardPrice}
          label={"Félpanziós felár"}
          onChange={handleOnChange}
        />
        <button type="submit" className="btn btn-primary">
          Felvitel
        </button>
      </form>
    </div>
  );
}
