import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import InputItem from "./InputItem";
import RadioItem from "./RadioItem";

export default function EditOne() {
  const { id } = useParams();
  const history = useHistory();

  const [quiz, setQuiz] = useState({});
  const [goodAnswer, setGoodAnswer] = useState("");

  const answerArr = useMemo(
    () => ["answer1", "answer2", "answer3", "answer4"],
    []
  );

  useEffect(() => {
    const snapShot = () => {
      db.collection("questions")
        .doc(id)
        .get()
        .then((doc) => {
          const temp = doc.data();
          const obj = {};
          obj.question = temp.question;
          obj.hit = temp.hit;
          obj.is_played = temp.is_played;
          answerArr.map((item, ix) => {
            if (temp.answers[ix].is_correct) {
              setGoodAnswer(item);
            }
            return (obj[item] = temp.answers[ix].answer);
          });
          setQuiz(obj);
        });
    };
    return snapShot();
  }, [id, answerArr]);

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  }

  function handleRadio(e) {
    setGoodAnswer(e.target.value);
  }

  function modifyQuiz() {
    const data = {
      question: quiz.question,
      hit: quiz.hit,
      is_played: quiz.is_played,
    };
    data.answers = answerArr.map((item) => {
      return {
        answer: quiz[item],
        is_correct: goodAnswer === item,
      };
    });
    db.collection("questions")
      .doc(id)
      .set(data)
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    modifyQuiz();
    setQuiz({
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
      <h2>Kvíz módosítás</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-fields">
          {quiz.question && (
            <InputItem
              onChange={handleInputChange}
              name="question"
              id="question"
              type="text"
              value={quiz.question}
              label="Kérdés"
            />
          )}
        </div>
        {answerArr.map((item, ix) => (
          <div key={item} className="input-container">
            <div className="input-fields">
              <InputItem
                onChange={handleInputChange}
                // dataName=""
                name={item}
                type="text"
                value={`${quiz[item]}`}
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
        <button type="submit" className="btn btn-primary mt-4">
          Módosítás
        </button>
      </form>
    </div>
  );
}
