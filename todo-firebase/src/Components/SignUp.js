import { useState, useRef, useEffect } from "react";
import auth from "../firebase/auth";
import validator from "validator";
import { Redirect } from "react-router";

export default function SignUp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCheck = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      userCheck();
    };
  }, [user, setUser]);

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
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((result) => {})
        .catch((error) => {
          console.error(error);
        });
      setFormAlertText("Sikeres regisztráció");
      setFormAlertType("success");
    } else {
      setFormAlertText("Hiányos adatok");
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
  }

  return (
    <div>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div className="container">
          <h1 className="mt-4">Regisztráció Email címmel</h1>
          <form
            onSubmit={handleSubmit}
            noValidate={true}
            className={`needs-validation ${
              formWasValidated ? "was-validated" : ""
            }`}
          >
            <div className={`${formErrors.email && "was-validated"}`}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                ref={references.email}
                className="form-control"
              />
            </div>
            <div className={`${formErrors.password && "was-validated"}`}>
              <label htmlFor="email" className="form-label">
                Jelszó
              </label>
              <input
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                ref={references.password}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Regisztráció
            </button>
          </form>
          {formAlertText && (
            <div className={`alert mt-2 alert-${formAlertType}`}>
              {formAlertText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
