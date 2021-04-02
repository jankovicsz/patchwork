import { useRef, useState, useEffect } from "react";
import validator from "validator";
import { Link } from "react-router-dom";

import InputItem from "./InputItem";
import auth from "../firebase/auth";

import "../App.scss";

export default function Home() {
  //
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [formAlertType, setFormAlertType] = useState("");
  const [formAlertText, setFormAlertText] = useState("");

  const [formWasValidated, setFormWasValidated] = useState(false);

  useEffect(() => {
    auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      });
  }, [ user, setUser, handleSubmit ]);

  const references = {
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: "Hiányzó érték",
    notValidEmail: "Érvénytelen formátum",
  });

  function isNotEmpty(value) {
    return value !== "";
  }

  function isEmailValid(value) {
    return validator.isEmail(value);
  }

  const validators = {
    email: {
      required: isNotEmpty,
      notValidEmail: isEmailValid,
    },
    password: {
      required: isNotEmpty,
    },
  };

  function validateField(fieldName) {
    const value = formData[fieldName];
    let isValid = true;
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

    if (validators[fieldName] !== undefined) {
      for (const [validatorType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = formErrorTypes[validatorType];
            setFormErrors((prev) => ({
              ...prev,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(formData)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormAlertText("");
    setFormAlertType("");
    setFormErrors((prev) => ({
      email: "",
      password: "",
    }));
    setFormWasValidated(false);

    const isValid = isFormValid();
    if (isValid) {
      auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
        console.log(result);
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
      setFormAlertText("Sikeres belépés");
      setFormAlertType("success");
    } else {
      setFormAlertText("Hibás adatok");
      setFormAlertType("danger");
    }
    setFormWasValidated(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleBlur(e) {
    const name = e.target.name;
    validateField(name);
    //setFormWasValidated(validateField(name));
  }

  return (
    <main>
      <h1 className="mt-4 mb-4">Bejelentkezés email címmel</h1>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${
          formWasValidated ? "was-validated" : ""
        }`}
      >
        <InputItem
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="email"
          labelText="Email cím"
          value={formData.email}
          reference={references.email}
          error={formErrors.email}
        />
        <InputItem
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="password"
          labelText="Jelszó"
          value={formData.password}
          reference={references.password}
          error={formErrors.password}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Bejelentkezés
        </button>
      </form>
      {formAlertText && (
        <div className={`alert mt-2 alert-${formAlertType}`}>
          {formAlertText}
        </div>
      )}
      <div className="mt-2"></div>
      <Link to="/email">
          Regisztráció email címmel és jelszóval
      </Link>
      <Link to="/google">
          Bejelentkezés Google fiókkal
      </Link>
      <div className="mt-2"></div>
      {user && <div className='mt-3'>Bejelentkezve: {user.email}</div>}
    </main>
  );
}
