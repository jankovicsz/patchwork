import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
// import { useLocation } from "react-router-dom";
import InputItem from "./InputItem";

export default function RemoveForm() {
  const [fieldValues, setFieldValues] = useState({
    alias: "",
    secretCode: "",
  });

  const [errors, setErrors] = useState({
    alias: "",
    secretCode: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const references = {
    alias: useRef(),
    secretCode: useRef(),
  };

  const errorTypes = {
    required: "Hiányzó érték",
    secretCode: "Nem megfelelő formátum",
  };

  const validators = {
    alias: {
      required: isNotEmpty,
    },
    secretCode: {
      required: isNotEmpty,
      //     secretCode: isNumber,
    },
  };

  function isNotEmpty(value) {
    return value !== "";
  }

  /*   function isNumber(value) {
    return Number(value) !== NaN;
  } */

  const history = useHistory();

  // const location = useLocation();
  // const currentPath = location.pathname;
  const currentPath = "/remove";

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

  async function isAliasExist(alias) {
    const snapshot = await db
      .collection("url")
      .where("alias", "==", alias)
      .get();
    return snapshot.docs.length !== 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormAlertText("");
    setFormAlertType("");
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      if (await isAliasExist(fieldValues.alias)) {
        history.push(
          `${currentPath}/${fieldValues.alias}/${fieldValues.secretCode}`
        );
/*         setTimeout(() => {
          history.push("/");
        }, 3000); */
      } else {
        setFormAlertText(`A(z) ${fieldValues.alias} alias nem létezik!`);
        setFormAlertType("danger");
      }
    }
    setFormWasValidated(true);
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
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  return (
    <div className="container">
      <h2 className="mt-4">Remove Form</h2>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${
          formWasValidated ? "was-validated" : ""
        }`}
      >
        <InputItem
          name="alias"
          type="text"
          onChange={handleInputChange}
          value={fieldValues.alias}
          label="Alias"
          required={true}
          references={references.alias}
          errors={errors.alias}
          onBlur={handleInputBlur}
        />
        <InputItem
          name="secretCode"
          type="text"
          onChange={handleInputChange}
          value={fieldValues.secretCode}
          label="Secret Code"
          required={true}
          references={references.secretCode}
          errors={errors.secretCode}
          onBlur={handleInputBlur}
        />
        {/* <Link to={`/remove/${fieldValues.alias}/${fieldValues.secretCode}`}> */}
        <button type="submit" className="btn btn-primary mt-4">
          Alias törlése
        </button>
        {/* </Link> */}
      </form>
      {formAlertText && (
        <div className={`alert mt-4 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
    </div>
  );
}
