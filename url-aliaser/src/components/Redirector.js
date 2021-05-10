import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db, firestore } from "../firebase/firebase";

export default function Redirector() {
  const { alias } = useParams();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    db.collection("url")
      .where("alias", "==", alias)
      .get()
      .then((ref) => {
        if (ref.docs.length > 0) {
          const doc = ref.docs[0];
          const docData = doc.data();
          const urlRef = db.collection("url").doc(doc.id);
          urlRef.update({
            hitCount: firestore.FieldValue.increment(1)
        });
          setUrl(docData.url);
          setTimeout(() => {
            window.location.href = docData.url;
          }, 3000);
        } else {
          setError("Az url nem létezik");
        }
      });
  }, [alias]);

  return (
    <div>
      <h2 className="mt-4">Redirector</h2>
      {url && (
        <div className="mt-4 alert alert-info" role="alert">
          Az átirányítás megtörténik 5 másodpercen belül ide: {url}
        </div>
      )}
      {error && (
        <div className="mt-4 alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
