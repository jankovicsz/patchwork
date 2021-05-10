import { useEffect, useRef, useState } from "react";
// import auth from "./firebase/auth";
import db from "./firebase/db";
//
import InputItem from "./components/InputItem";
import "./App.scss";

function App() {
  const [blogItems, setBlogItems] = useState([]);

  const [fieldValues, setFieldValues] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [alert, setAlert] = useState(null);

  const references = {
    title: useRef(),
    content: useRef(),
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("blog")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const items = [];
        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          items.push(docData);
        });
        setBlogItems(items);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const errorTypes = Object.freeze({
    required: "Empty field",
  });

  const messageTypes = Object.freeze({
    success: `🔔 Your post has been submitted successfully! 🔔`,
  });

  const isNotEmpty = (value) => {
    return value !== "";
  };

  const validators = {
    title: {
      required: isNotEmpty,
    },
    content: {
      required: isNotEmpty,
    },
  };

  const validateField = (fieldName) => {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((prev) => ({
              ...prev,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  };

  const isFormValid = () => {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  };

  function handleSubmit(e) {
    e.preventDefault();

    setAlert(null);
    setErrors((prev) => ({
      title: "",
      content: "",
    }));

    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      const data = {
        ...fieldValues,
        date: new Date(),
      };
      db.collection("blog")
        .add(data)
        .then((ref) => {
          setAlert({ alertType: "dark", message: messageTypes.success });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setAlert({ alertType: "danger", message: messageTypes.fail });
        });
      setFieldValues({
        title: "",
        content: "",
      });
    } else {
      setFormWasValidated(true);
    }
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
    setAlert(null);
  }

  function handleBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  function handleDelete(e) {
    const id = e.target.id;
    db.collection("blog")
      .doc(id)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setAlert(null);
  }

  return (
    <>
      <header>
        <h1 className="mt-4 mb-4">The Blog</h1>
      </header>
      <main>
        <section className="new-post">
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
          <form
            onSubmit={handleSubmit}
            noValidate={true}
            className={`needs-validation ${
              formWasValidated && "was-validated"
            }`}
          >
            <InputItem
              label="Title"
              type="text"
              name="title"
              value={fieldValues.title}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              reference={references.title}
              errors={errors}
              placeholder="Lorem Ipsum is simply dummy text"
            />
            <InputItem
              label="Content"
              type="textarea"
              name="content"
              value={fieldValues.content}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              reference={references.content}
              errors={errors}
              placeholder="Lorem Ipsum... max 1000 character"
            />
            <button type="submit" className="btn btn-secondary mt-2">
              Submit
            </button>
          </form>
        </section>
        <h4 className="posts-header">Posts</h4>
        {blogItems.map((item) => (
          <section key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div onClick={handleDelete} id={item.id} className="delete-post">
              Delete post
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default App;
