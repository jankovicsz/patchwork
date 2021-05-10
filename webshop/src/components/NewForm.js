import { useRef, useState } from "react";
import validator from "validator";

import InputItem from "./InputItem";
import CheckItem from "./CheckItem";
import RadioItem from "./RadioItem";

export default function NewForm() {
  // a tourist Home-ban van a dinamikus select

  const [goodAnswer, setGoodAnswer] = useState("");

  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    category: "",
  });

  const references = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
    birthDate: useRef(),
    category: useRef(),
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    category: "",
  });

  const [isChecked, setIsChecked] = useState([]);

  const categoryOptions = [
    {
      value: "",
      text: "Válassz",
    },
    { value: "múzeum" },
    { value: "étterem" },
    { value: "építmény" },
  ];

  const answerArr = [
    "sonka",
    "gomba",
    "kukorica",
    "hagyma",
    "majonéz",
    "ketchup",
  ];


  const radioArr = ["hamburger", "hot dog", "gyros"];

  const errorTypes = Object.freeze({
    required: "Hiányzó érték",
    yearTooSmall: "Nem hiszem el, hogy ilyen idős vagy",
    yearTooBig: "Nem hiszem el, hogy a jövőben születtél",
    notValidEmail: "Érvénytelen formátum",
    isADate: "Kérlek valós dátumot adj meg!",
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = Object.freeze({
    success: `Sikeres regisztráció!`,
    fail: `Valami nem jó`,
  });

  function isADate(value) {
    const dateString = new Date(value).toString();
    return dateString !== "Invalid Date";
  }

  function isNotEmpty(value) {
    return value !== "";
  }

  /*   function isYearTooSmall(value) {
    return value >= 1900;
  };

  function isYearTooBig(value) {
    return value <= new Date().getFullYear();
  }; */

  function isEmailValid(value) {
    return validator.isEmail(value);
  }

  const validators = {
    name: {
      required: isNotEmpty,
    },
    email: {
      required: isNotEmpty,
      notValidEmail: isEmailValid,
    },
    password: {
      required: isNotEmpty,
    },
    birthDate: {
      required: isNotEmpty,
      isADate: isADate,
      /*       yearTooSmall: isYearTooSmall,
      yearTooBig: isYearTooBig, */
    },
    category: {
      required: isNotEmpty,
    },
  };

  function validateField(fieldName) {
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
  }

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    setAlert(null);
    setErrors((prev) => ({
      name: "",
      email: "",
      password: "",
      birthDate: "",
      category: "",
    }));

    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      setAlert({ alertType: "success", message: messageTypes.success });
      console.log(
        `${fieldValues.name}, ${fieldValues.email}, ${fieldValues.password}, ${fieldValues.birthDate}, ${fieldValues.category}`
      );
    } else {
      setFormWasValidated(true);
    }
    setFieldValues({
      name: "",
      email: "",
      password: "",
      birthDate: "",
      category: "",
    });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
  }

  function handleOnBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  function handleCheckbox(e) {
    const { checked, value } = e.target;
    checked
      ? setIsChecked([...isChecked, value])
      : setIsChecked(isChecked.filter((element) => element !== value));
  }

  function handleRadio(e) {
    setGoodAnswer(e.target.value);
  }

  return (
    <>
      <h1 className="mt-4 mb-4">New Form</h1>
      {alert && (
        <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${formWasValidated && "was-validated"}`}
      >
        <div className="checkboxes">
          {answerArr.map((item) => (
            <CheckItem
              key={item}
              onChange={handleCheckbox}
              name={item}
              label={item}
            />
          ))}
        </div>
        {radioArr.map((item) => (
          <div key={item} className="input-container">
            <div className="radios">
              <RadioItem
                name="answer"
                value={item}
                onChange={handleRadio}
                goodAnswer={goodAnswer}
                label={item}
              />
            </div>
          </div>
        ))}
        <InputItem
          type="text"
          name="name"
          value={fieldValues.name}
          label="Name"
          onChange={handleInputChange}
          required={true}
          reference={references.name}
          errors={errors.name}
          onBlur={handleOnBlur}
        />
        <InputItem
          type="email"
          name="email"
          value={fieldValues.email}
          label="Email"
          onChange={handleInputChange}
          required={true}
          reference={references.email}
          errors={errors.email}
          onBlur={handleOnBlur}
        />
        <InputItem
          type="password"
          name="password"
          value={fieldValues.password}
          label="Password"
          onChange={handleInputChange}
          required={true}
          reference={references.password}
          errors={errors.password}
          onBlur={handleOnBlur}
        />
        <InputItem
          type="text"
          name="birthDate"
          value={fieldValues.birthDate}
          label="Birth Date"
          onChange={handleInputChange}
          required={true}
          reference={references.birthDate}
          errors={errors.birthDate}
          onBlur={handleOnBlur}
        />
        <InputItem
          label="Kategória"
          type="select"
          name="category"
          value={fieldValues.category}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          required={true}
          options={categoryOptions}
          errors={errors.category}
          reference={references.category}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        {isChecked.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div>{goodAnswer}</div>
      <div>{fieldValues.name}</div>
      <div>{fieldValues.email}</div>
      <div>{fieldValues.password}</div>
      <div>{fieldValues.birthDate}</div>
      <div>{fieldValues.category}</div>
    </>
  );
}
