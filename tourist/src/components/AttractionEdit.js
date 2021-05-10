import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase/config";

import InputItem from "./InputItem";

export default function AttractionEdit() {
  const [fieldValues, setFieldValues] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const references = {
    name: useRef(),
    settlement: useRef(),
    address: useRef(),
    category: useRef(),
    price: useRef(),
    note: useRef(),
  };

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getAttraction = () => {
      db.collection("attractions")
        .doc(id)
        .get()
        .then((doc) => {
          setFieldValues(doc.data());
        });
    };
    return getAttraction();
  }, [id]);

  const categoryOptions = [
    {
      value: "",
      text: "Válassz",
    },
    { value: "múzeum" },
    { value: "étterem" },
    { value: "építmény" },
  ];

  const errorTypes = {
    required: "Hiányzó érték",
    length1000: "Nem lehet több, mint 1000 karakter",
    negativePrice: "Nem lehet kisebb, mint 0",
  };

  const validators = {
    name: {
      required: isNotEmpty,
    },
    settlement: {
      required: isNotEmpty,
    },
    address: {
      required: isNotEmpty,
    },
    category: {
      required: isNotEmpty,
    },
    price: {
      required: isNotEmpty,
      negativePrice: isNotNegative,
    },
    note: {
      length1000: isLengthLessThan1000,
    },
  };

  function isNotEmpty(value) {
    return value !== "";
  }

  function isNotNegative(value) {
    return value >= 0;
  }

  function isLengthLessThan1000(value) {
    return value.length <= 1000;
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

  function validateField(fieldName) {
    if (fieldName === "id") return true;

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
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                [fieldName]: errorText,
              };
            });
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    setFormAlertText("");
    setFormAlertType("");
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      db.collection("attractions")
        .doc(id)
        .set({
          name: fieldValues.name,
          settlement: fieldValues.settlement,
          address: fieldValues.address,
          category: fieldValues.category,
          price: fieldValues.price,
          note: fieldValues.note,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      setFieldValues({
        name: "",
        settlement: "",
        address: "",
        category: "",
        price: "",
        note: "",
      });
      setFormWasValidated(false);
      setTimeout(() => {
        history.push("/");
      }, 2000);
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
  }

  function handleBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Látványosság szerkesztése</h1>
      {fieldValues ? (
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          className={`needs-validation ${
            formWasValidated ? "was-validated" : ""
          }`}
        >
          <InputItem
            label="Megnevezés"
            type="text"
            name="name"
            value={fieldValues.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={true}
            errors={errors}
            reference={references.name}
          />
          <InputItem
            label="Település"
            type="text"
            name="settlement"
            value={fieldValues.settlement}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={true}
            errors={errors}
            reference={references.settlement}
          />
          <InputItem
            label="Cím"
            type="text"
            name="address"
            value={fieldValues.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={true}
            errors={errors}
            reference={references.address}
          />
          <InputItem
            label="Kategória"
            type="select"
            name="category"
            value={fieldValues.category}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={true}
            options={categoryOptions}
            errors={errors}
            reference={references.category}
          />
          <InputItem
            label="Ár"
            type="text"
            name="price"
            value={fieldValues.price}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={true}
            errors={errors}
            reference={references.price}
          />
          <InputItem
            label="Megjegyzés"
            type="textarea"
            name="note"
            value={fieldValues.note}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={errors}
            reference={references.note}
          />
          <button type="submit" className="btn btn-primary">
            Mentés
          </button>
        </form>
      ) : (
        <div>Hibás ID. Nincs ilyen látványosság.</div>
      )}
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
    </div>
  );
}
