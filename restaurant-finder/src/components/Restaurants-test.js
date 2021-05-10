import { useEffect, useState } from "react";
import db from "../firebase/db";
import firestore from "../firebase/firestore";

export default function RestaurantsTtest() {
  const [restaurants, setRestaurants] = useState([]);
  const restiCollect = db.collection("test2");

  /*   db.collection("resti").limit(15).get().then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((item) => {
      const docItem = item.data();
      docItem["docId"] = item.id;
      items.push(docItem);
    });
    setRestaurants(items);
}); */

  useEffect(() => {
/*     const listRestaurants = restiCollect
      .where("borough", "in", ["Brooklyn", "Bronx", "Staten Island", "Queens"])
      .orderBy(firestore.FieldPath.documentId())
      .limit(20)
      .onSnapshot((snapshot) => {
        const items = [];
        snapshot.docs.forEach((item, ix) => {
          if (ix >= 0) {
            const docItem = item.data();
            docItem.gradeScore = 0;
            docItem.grades.forEach((item) => {
              docItem.gradeScore += item.score;
            });
            docItem.docId = item.id;
            docItem.gradeScore > 50 && items.push(docItem);
          }
        });
        setRestaurants(items);
      }); */
      restiCollect
      .limit(20)
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.docs.forEach((item) => {
            const docItem = item.data();
            docItem.docId = item.id;
            items.push(docItem);
        });
        setRestaurants(items);
      });
/*     return () => {
      listRestaurants();
    }; */
  }, []);

  function sortObject(a, b) {
    let nameA = a.borough.toUpperCase(); // nagybetűk és kisbetűk elhagyása
    let nameB = b.borough.toUpperCase(); // nagybetűk és kisbetűk elhagyása
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // a neveknek egyeznie kell
    return 0;
  }

  return (
    <div>
      <h2>Restaurants</h2>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Borough</th>
              <th scope="col">Zip code</th>
              <th scope="col">Street</th>
              <th scope="col">Grades</th>
              <th scope="col">Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.sort(sortObject).map(
              (item) =>
                item.gradeScore > 1 && (
                  <tr key={item.docId}>
                    <td>{item.name}</td>
                    <td>{item.borough}</td>
                    <td>{item.docId}</td>
                    <td>{item.address.street}</td>
                    <td>{item.gradeScore}</td>
                    <td>{item.cuisine}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
