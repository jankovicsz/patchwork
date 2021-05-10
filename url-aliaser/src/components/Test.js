import { useEffect, useState } from "react";
import {db} from "../firebase/firebase";

export default function Test() {

    const [resti, setResti] = useState([]);

    useEffect(() => {
        db.collection('resti').get().then((snapshot) => {
            const items = []
            snapshot.forEach((item) => {
                const obj = item.data();
                obj.id = item.id;
                items.push(obj);
            })
            setResti(items);
        })
    }, []);

/*     const urlObj = {
        url: "https://telex.hu/",
        alias: "telex",
        hitCount: 0,
        secretCode: Math.floor(Math.random() * 9000 + 1000)
    }

    db.collection('url').add(urlObj).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    }); */


    return (
        <>
        <h1>Test1</h1>
        {console.log(resti)}
        </>
    )
}