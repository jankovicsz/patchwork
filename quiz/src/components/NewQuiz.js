import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";

import InputItem from "./InputItem";
// import CheckItem from "./CheckItem";
import RadioItem from "./RadioItem";

export default function NewQuiz() {
  const [goodAnswer, setGoodAnswer] = useState("");
  // const [isChecked, setIsChecked] = useState([]);
  const answerArr = ["answer1", "answer2", "answer3", "answer4"];

  const [newQuiz, setNewQuiz] = useState({
    question: "",
    hit: false,
    is_played: false,
    [answerArr[0]]: "",
    [answerArr[1]]: "",
    [answerArr[2]]: "",
    [answerArr[3]]: "",
  });

  const history = useHistory();

  function addQuiz() {
    const data = {
      question: newQuiz.question,
      hit: newQuiz.hit,
      is_played: newQuiz.is_played,
    };
    data.answers = answerArr.map((item) => {
      return {
        answer: newQuiz[item],
        is_correct: goodAnswer === item,
      };
    });
    db.collection("questions")
      .add(data)
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addQuiz();
    setNewQuiz({
      question: "",
      hit: false,
      is_played: false,
      [answerArr[0]]: "",
      [answerArr[1]]: "",
      [answerArr[2]]: "",
      [answerArr[3]]: "",
    });
    setTimeout(() => {
      history.push("/edit");
    }, 1000);
  }

  /*   function handleCheckbox(e) {
    const { checked, value } = e.target;
    checked
      ? setIsChecked([...isChecked, value])
      : setIsChecked(isChecked.filter((element) => element !== value));
  } */

  function handleRadio(e) {
    setGoodAnswer(e.target.value);
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewQuiz({
      ...newQuiz,
      [name]: value,
    });
  }

  return (
    <div className="container">
      <div className="btn-container">
        <Link to="/">
          <button className="btn btn-primary mt-4 mb-4" type="button">
            Quiz játék indítása
          </button>
        </Link>
        <Link to="/edit">
          <button className="btn btn-success mt-4 mb-4" type="button">
            Kérdések szerkesztése
          </button>
        </Link>
      </div>
      <h2>Új Quiz hozzáadása</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="checkboxes">
        {answerArr.map((item) => (
          <CheckItem
            key={item}
            onChange={handleCheckbox}
            name={item}
            label="Igaz"
          />
        ))}
        </div> */}
        <div className="input-fields">
          <InputItem
            onChange={handleInputChange}
            name="question"
            id="question"
            type="text"
            value={newQuiz.question}
            label="Kérdés"
          />
        </div>
        {answerArr.map((item, ix) => (
          <div key={item} className="input-container">
            <div className="input-fields">
              <InputItem
                onChange={handleInputChange}
                name={item}
                type="text"
                value={`${newQuiz[item]}`}
                label={`Válasz ${ix + 1}`}
              />
            </div>
            <div className="radios">
              <RadioItem
                name="answer"
                value={item}
                onChange={handleRadio}
                goodAnswer={goodAnswer}
                label="Igaz"
              />
            </div>
          </div>
        ))}

        <button className="btn btn-primary mt-4 mb-4" type="submit">
          Quiz hozzáadása
        </button>
      </form>
    </div>
  );
}
