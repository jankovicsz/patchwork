import auth from "../firebase/auth";
import { useState, useEffect } from "react";
//
import Todos from "./Todos";
import SignIn from "./SignIn";
import Logout from "./Logout";

export default function Home() {
  const [user, setUser] = useState(null);

  function handleLogout(e) {
    e.preventDefault();
    auth().signOut().then(() => {
        console.log("Sign out succesfull");
        setUser(null);
      }).catch((error) => {
        console.log(error);
      });
}

useEffect(() => {
  const userCheck = auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      userCheck();
    }
}, [ user, setUser ]);

  return (
    <main>
      {user ? (
        <>
          <Todos user={user} />
          <Logout handleLogout={handleLogout} />{" "}
        </>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
