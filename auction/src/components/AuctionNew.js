import { useRef, useState } from "react";
import { db } from "../firebase/config";

import InputItem from "./InputItem";

export default function AuctionNew() {
  const [fieldValues, setFieldValues] = useState({
    title: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    expiryDate: "",
  });

  const references = {
    title: useRef(),
    expiryDate: useRef(),
  };

  const messageTypes = Object.freeze({
    success: "Sikeres mentés!",
    fail: "Sikertelen mentés",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const formErrorTypes = Object.freeze({
    required: "Hiányzó érték",
    isADate: "Kérlek valós dátumot adj meg!",
  });

  const [alert, setAlert] = useState(null);

  const isNotEmpty = (value) => {
    return value !== "";
  };

  const isADate = (value) => {
    const dateString = new Date(value).toString();
    return dateString !== "Invalid Date";
  };

  const validators = {
    title: {
      required: isNotEmpty,
    },
    expiryDate: {
      required: isNotEmpty,
      isADate: isADate,
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
            const errorText = formErrorTypes[validationType];
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
      expiryDate: "",
    }));
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      const data = {
        title: fieldValues.title,
        expiryDate: new Date(fieldValues.expiryDate),
        highestBid: 0,
        highestBidderName: "",
      };
      const auctionRef = db.collection("auctions");
      auctionRef
        .add(data)
        .then((docRef) => {
          setAlert({ alertType: "success", message: messageTypes.success });
          setFieldValues({
            title: "",
            expiryDate: "",
          });
        })
        .catch((error) => {
          setAlert({ alertType: "danger", message: messageTypes.fail });
        });
    } else {
      setFormWasValidated(true);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });

    e.target.setCustomValidity("");

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
    <div>
      <h1>Új tétel hozzáadása</h1>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${formWasValidated ? "was-validated" : ""}`}
        // className={`needs-validation ${formWasValidated && 'was-validated'}`}
      >
        <InputItem
          label="Tétel megnevezése"
          type="text"
          name="title"
          value={fieldValues.title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.title}
          errors={errors}
        />
        <InputItem
          label="Lejárati dátum"
          type="text"
          name="expiryDate"
          value={fieldValues.expiryDate}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.expiryDate}
          errors={errors}
        />
        <button
          className="btn btn-primary mb-4"
          type="submit"
          // onClick={handleButtonBid}
        >
          Licit
        </button>
        {alert && <div className={`alert alert-${alert.alertType}`}>{alert.message}</div>}
      </form>
      {/*       {formAlertText &&
      <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
        {formAlertText}
      </div>
      } */}
    </div>
  );
}
