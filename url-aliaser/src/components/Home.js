import { useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

import InputItem from "./InputItem";

export default function Home() {
  const [fieldValues, setFieldValues] = useState({
    url: "",
    alias: "",
  });

  const [errors, setErrors] = useState({
    url: "",
    alias: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const references = {
    url: useRef(),
    alias: useRef(),
  };

  const errorTypes = {
    required: "Hiányzó érték",
    url: "Nem megfelelő formátum",
  };

  const validators = {
    url: {
      required: isNotEmpty,
      url: isUrlValid,
    },
    alias: {
      required: isNotEmpty,
    },
  };

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

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => ({
              ...previousErrors,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function isNotEmpty(value) {
    return value !== "";
  }

  function isUrlValid(url) {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  }

  async function isAliasExist(alias) {
    const snapshot = await db
      .collection("url")
      .where("alias", "==", alias)
      .get();
    return snapshot.docs.length !== 0;
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
  }

  function handleInputBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormAlertText("");
    setFormAlertType("");
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      const urlObj = {
        url: fieldValues.url,
        alias: fieldValues.alias,
        hitCount: 0,
        secretCode: Math.floor(Math.random() * 9000 + 1000),
      };
      if (!(await isAliasExist(urlObj.alias))) {
        db.collection("url")
          .add(urlObj)
          .then((docRef) => {
            setFormAlertText(
              `Sikeres mentés, a törléshez szükséges kód: ${urlObj.secretCode}`
            );
            setFormAlertType("success");
            setFieldValues({
              url: "",
              alias: "",
            });
          })
          .catch((error) => {
            console.log("Error adding document: ", error);
          });
      } else {
        setFormAlertText(`A(z) ${urlObj.alias} alias már létezik!`);
        setFormAlertType("danger");
      }
    }
    setFormWasValidated(true);
  }

  return (
    <div>
      <h1 className="mt-4 mb-4">URL Aliaser</h1>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${
          formWasValidated ? "was-validated" : ""
        }`}
      >
        <InputItem
          name="url"
          type="text"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={fieldValues.url}
          references={references.url}
          required={true}
          label="URL"
          errors={errors.url}
        />
        <InputItem
          name="alias"
          type="text"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={fieldValues.alias}
          references={references.alias}
          required={true}
          label="Alias"
          errors={errors.alias}
        />
        <button type="submit" className="btn btn-primary">
          Mentés
        </button>
      </form>
      {formAlertText && (
        <div className={`alert mt-4 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
      {formAlertType === "success" && (
        <Link to="/remove">
          <button type="button" className="mt-3 btn btn-primary">
            Alias törlése
          </button>
        </Link>
      )}
    </div>
  );
}
