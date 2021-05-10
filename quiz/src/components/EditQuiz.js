import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Link, useHistory } from "react-router-dom";

export default function EditQuiz() {
  const [quizArr, setQuizArr] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const snapShot = db
      .collection("questions")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.docs.forEach((doc) => {
          const quizObj = doc.data();
          quizObj.id = doc.id;
          quizObj.hit = false;
          quizObj.is_played = false;
          items.push({ ...quizObj });
          /* Beállítja a hit és az is_played értékét
          db.collection("questions").doc(doc.id).set(quizObj)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            }); */
        });
        setQuizArr(items);
      });
    return () => {
      snapShot();
    };
  }, []);

  function handleOnClickDelete(e) {
    db.collection("questions")
      .doc(e.target.dataset.id)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  }

  function handleOnClickEdit(e) {
    history.push(`/edit/${e.target.dataset.id}`)
  }

  return (
    <div>
      <div className="btn-container">
        <Link to="/">
          <button
            className="btn btn-primary mt-4 mb-4"
            type="button"
            /* onClick={handleNewGameButton} */
          >
            Quiz játék indítása
          </button>
        </Link>
        <Link to="/new">
          <button
            className="btn btn-success mt-4 mb-4"
            type="button"
            /* onClick={handleNewGameButton} */
          >
            Új Quiz hozzáadása
          </button>
        </Link>
      </div>
      <h2 className="mt-4 mb-4">Quiz szerkesztése</h2>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Answer1</th>
            <th scope="col">Answer2</th>
            <th scope="col">Answer3</th>
            <th scope="col">Answer4</th>
            <th scope="col">Szerkeszt</th>
            <th scope="col">Töröl</th>
          </tr>
        </thead>
        <tbody>
          {quizArr.map((elem) => (
            <tr key={elem.id} data-id={elem.id} id={elem.id}>
              <td>{elem.question}</td>
              {elem.answers.map((element) => (
                <td
                  key={element.answer}
                  className={element.is_correct ? "under-line" : ""}
                >
                  {element.answer}
                </td>
              ))}
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOnClickEdit}
                  data-id={elem.id}
                >
                  Szerkeszt
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleOnClickDelete}
                  data-id={elem.id}
                >
                  Töröl
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
