import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {db} from "../firebase/firebase";

export default function Remover() {
  const { alias, secretCode } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    db.collection("url")
      .where("alias", "==", alias)
      .where("secretCode", "==", Number(secretCode))
      .get()
      .then((ref) => {
        if (ref.docs.length > 0) {
          const doc = ref.docs[0];
          db.collection("url")
            .doc(doc.id)
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
              setMessage("Sikeres törlés");
              setTimeout(() => {
                history.push("/");
              }, 3000);
            })
            .catch((error) => {
              setError("Sikertelen törlés: ", error);
            });
        } else {
          setError("Sikertelen törlés");
          setTimeout(() => {
            history.push("/remove");
          }, 3000);
        }
      });
  }, [alias, secretCode, history]);
  return (
    <div>
      <h2 className="mt-4">Remover</h2>
      {message && (
        <div className="alert alert-info mt-4" role="alert">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
