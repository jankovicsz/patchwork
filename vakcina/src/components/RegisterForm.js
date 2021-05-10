import { useState, useRef } from "react";
import validator from "validator";
//
import InputItem from "./InputItem";
//
import db from "../firebase/db";

export default function RegisterForm() {
  const [fieldValues, setFieldValues] = useState({
    fullName: "",
    yearOfBirth: "",
    isVaccinated: false,
    email: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    yearOfBirth: "",
    isVaccinated: "",
    email: "",
  });

  const errorTypes = Object.freeze({
    required: "Hiányzó érték",
    yearTooSmall: "Nem hiszem el, hogy ilyen idős vagy",
    yearTooBig: "Nem hiszem el, hogy a jövőben születtél",
    notValidEmail: "Érvénytelen formátum",
  });

  const references = {
    fullName: useRef(),
    yearOfBirth: useRef(),
    isVaccinated: useRef(),
    email: useRef(),
  };

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = Object.freeze({
    highPriority: `Sikeres regisztráció!
    ❗ Miharabbi oltás szükséges! ❗`,
    success: `Sikeres regisztráció!
    🔔Hamarosan értesítjük!🔔`,

    notPriority: `Sikeres regisztráció!
     👍Nem szükséges a személy oltása.👍`,
  });

  const isNotEmpty = (value) => {
    return value !== "";
  };

  const isYearTooSmall = (value) => {
    return value >= 1900;
  };

  const isYearTooBig = (value) => {
    return value <= new Date().getFullYear();
  };

  const isEmailValid = (value) => {
    return validator.isEmail(value);
  };

  const validators = {
    fullName: {
      required: isNotEmpty,
    },
    yearOfBirth: {
      required: isNotEmpty,
      yearTooSmall: isYearTooSmall,
      yearTooBig: isYearTooBig,
    },
    email: {
      required: isNotEmpty,
      notValidEmail: isEmailValid,
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

  const currentYear = new Date().getFullYear();
  const regYear = parseInt(fieldValues.yearOfBirth);

  function registration() {
    const data = {
      ...fieldValues,
      yearOfBirth: regYear,
    };
    db.collection("hungarian-people")
      .add(data)
      .catch((error) => {
        console.error("Error adding document: ", error);
        setAlert({ alertType: "danger", message: messageTypes.fail });
      });
    setFieldValues({
      fullName: "",
      yearOfBirth: "",
      isVaccinated: false,
      email: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setAlert(null);
    setErrors((prev) => ({
      fullName: "",
      yearOfBirth: "",
      isVaccinated: false,
      email: "",
    }));

    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      if (fieldValues.isVaccinated) {
        setAlert({ alertType: "success", message: messageTypes.notPriority });
        registration();
      } else if (currentYear - regYear >= 60) {
        setAlert({ alertType: "warning", message: messageTypes.highPriority });
        registration();
      } else {
        setAlert({ alertType: "success", message: messageTypes.success });
        registration();
      }
    } else {
      setFormWasValidated(true);
    }
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function handleBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  return (
    <>
      <h2 className="mb-4 mt-4">Regisztráció oltásra</h2>
      {alert && (
        <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${formWasValidated && "was-validated"}`}
      >
        <InputItem
          label="Teljes név"
          type="text"
          name="fullName"
          value={fieldValues.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.fullName}
          errors={errors}
        />
        <InputItem
          label="Születési év"
          type="text"
          name="yearOfBirth"
          value={fieldValues.yearOfBirth}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.yearOfBirth}
          errors={errors}
        />
        <input
          type="checkbox"
          name="isVaccinated"
          value="isVaccinated"
          // value={fieldValues.isVaccinated} ??
          id="vaccine"
          className="form-check-input"
          onChange={handleInputChange}
          ref={references.isVaccinated}
          checked={fieldValues.isVaccinated}
        />
        <label htmlFor="vaccine" className="form-label ms-2 mb-4">
          Oltott
        </label>
        <InputItem
          label="Email cím"
          type="email"
          name="email"
          value={fieldValues.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.email}
          errors={errors}
        />
        <button type="submit" className="mb-5 btn btn-primary">
          Regisztráció
        </button>
      </form>
    </>
  );
}
