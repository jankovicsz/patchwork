import { useEffect, useState } from "react";
import db from "../firebase/db";
//
import NewTodo from "./NewTodo";
import TodoTable from "./TodoTable";

export default function Todos({ user }) {
  const [newTodo, setNewTodo] = useState({
    text: "",
    completed: false,
    date: new Date(),
  });

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const listTodos = db
      .collection("todo")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        const items = [];

        snapshot.docs.forEach((item) => {
          const docItem = item.data();
          docItem["docId"] = item.id;
          items.push(docItem);
        });
        setTodo(items);
      });

    return () => {
      listTodos();
    };
  }, []);

  function handleInputChange(e) {
    setNewTodo({
      ...newTodo,
      text: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    db.collection("todo")
      .add(newTodo)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    setNewTodo({
      text: "",
      completed: false,
      date: new Date(),
    });
  }

  function handleComplete(e) {
    e.preventDefault();
    const { id } = e.target;
    const todoRef = db.collection("todo").doc(id);
    return todoRef
      .update({
        completed: true,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    const { id } = e.target;
    db.collection("todo")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <div className="todo-container">
      <h1 className="mt-4 mb-4">
        Todos for {user.displayName ? user.displayName : user.email}
      </h1>
      <NewTodo
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        value={newTodo.text}
        name="new-todo"
      />
      <TodoTable
        todo={todo}
        onClickComplete={handleComplete}
        onClickDelete={handleDelete}
      />
    </div>
  );
}
