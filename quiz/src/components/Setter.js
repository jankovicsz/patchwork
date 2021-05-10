import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

export default function Setter() {
  const [quizArr, setQuizArr] = useState([]);

  useEffect(() => {
    const snapShot = db.collection("questions")
      //.orderBy(firebase.firestore.FieldPath.documentId())
      //.orderBy("question")
      //.where('hit', '==', false)
      //.where('is_played', '==', false)
      .onSnapshot((querySnapshot) => {
        const quizTemp = [];
        querySnapshot.forEach((doc) => {
          if (quizTemp.length > 0) {
            return;
          }
          const quizObj = doc.data();
          quizObj.id = doc.id;
          quizObj.hit = false;
          quizObj.is_played = false;
          quizTemp.push({ ...quizObj });
          //Beállítja a hit és az is_played értékét
          db.collection("questions").doc(doc.id).set(quizObj)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            }); 
        });
        setQuizArr(quizTemp);
      });
      return () => {
        snapShot();
      };
  }, []);
  return (
    <div>
      <h2 className="mt-4 mb-4">Setter</h2>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Question</th>
            <th scope="col">Answer1</th>
            <th scope="col">Answer2</th>
            <th scope="col">Answer3</th>
            <th scope="col">Answer4</th>
            <th scope="col">Hit</th>
            <th scope="col">Played</th>
          </tr>
        </thead>
        <tbody>
          {quizArr.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.question}</td>
              {elem.answers.map((element) => (
                <td
                  key={element.answer}
                  className={element.is_correct ? "under-line" : ""}
                >
                  {element.answer}
                </td>
              ))}
              <td>{elem.hit ? "True" : "False"}</td>
              <td>{elem.is_played ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
