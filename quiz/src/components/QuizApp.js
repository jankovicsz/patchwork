import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

export default function QuizApp() {
  const [quizArr, setQuizArr] = useState([]);
  const [quizObject, setQuizObject] = useState({});
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);
  //const [selected, setSelected] = useState("");
  const [end, setEnd] = useState("");
  const [count, setCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const snapShot = () => {
      db.collection("questions")
        .where("hit", "==", false)
        .where("is_played", "==", false)
        .limit(1)
        .onSnapshot((querySnapshot) => {
          setQuizObject({});
          const items = [];
          querySnapshot.docs.forEach((doc) => {
            const quizObj = doc.data();
            quizObj.id = doc.id;
            setQuizObject(quizObj);
            items.push(quizObj);
          });
          setQuizArr(items);
        });
    };
    return snapShot();
  }, []);

  function handleAnswerButton(e) {
    // const buttonId = parseInt(e.target.dataset.id);
    // setSelected(buttonId);
    setVisible(true);
    setEnd("");
    const playdObj = {
      is_played: true,
    };

    setTimeout(() => {
      if (!!e.target.dataset.correct) {
        setScore(score + 1);
      }
      setCount(count + 1);
      const quizRef = db
        .collection("questions")
        .doc(e.target.parentElement.id);
      quizRef
        .set(playdObj, { merge: true })
        .then(() => {})
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      setVisible(false);
    }, 1000);
    setTimeout(() => {
      setEnd("Vége a játéknak!");
    }, 2000);
  }

  function handleNewGameButton(e) {
    setScore(0);
    db.collection("questions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const quizRef = db.collection("questions").doc(doc.id);
          quizRef
            .update({
              is_played: false,
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      });
  }

  function handleEditGame() {
    history.push("/edit");
  }

  return (
    <div>
      <h1 className="mt-2 mb-2">QUIZ JÁTÉK</h1>
      <h2 className="mt-2 mb-2">Pontszám: {score}</h2>

      <div id={quizObject.id} className="quizbox">
        <div className="question">{quizObject.question}</div>
        {quizObject.question &&
          quizObject.answers.map((element, ix) => (
            <button
              data-correct={element.is_correct ? true : null}
              data-id={ix}
              type="button"
              key={element.answer}
              className={
                visible && element.is_correct
                  ? "good-answer"
/*                   : visible && selected === ix
                  ? "bad-answer" */
                  : ""
              }
              onClick={handleAnswerButton}
            >
              {element.answer}
            </button>
          ))}
        {quizArr.length === 0 && (
          <div className={end === "" ? "d-none" : ""}>
            <h1 className="mb-5">{end}</h1>
            <h2>{`${count}-ből ${score} pontot értél el`}</h2>
          </div>
        )}
      </div>

      <div>
        <button
          className="btn btn-success mt-4"
          type="button"
          onClick={handleNewGameButton}
        >
          Új játék
        </button>
        <button
          className="btn btn-secondary mt-4"
          type="button"
          onClick={handleEditGame}
        >
          Kérdések szerkesztése
        </button>
      </div>
    </div>
  );
}
