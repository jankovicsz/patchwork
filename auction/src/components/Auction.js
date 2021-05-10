import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import { db } from "../firebase/config";

import AuctionTable from "./AuctionTable";
import InputItem from "./InputItem";

export default function Auction() {
  const [auctionItems, setAuctionItems] = useState([]);
  const [isChecked, setIsChecked] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const [fieldValues, setFieldValues] = useState({
    title: "",
    name: "",
    bid: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    name: "",
    bid: "",
  });

  const [alert, setAlert] = useState(null);

  const references = {
    title: useRef(),
    name: useRef(),
    bid: useRef(),
  };

  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = Object.freeze({
    smallBid: "👎 Az ajánlatod nem elég magas! 👎",
    over: "🔚 Ez az árverés véget ért! 🔚",
    success: "🎉🎉 Juhú! A te ajánlatod a legmagasabb! 🎉🎉",
  });

  const formErrorTypes = Object.freeze({
    required: "Hiányzó érték",
    isANumber: "Kérlek számot adj meg",
  });

  const isNotEmpty = (value) => {
    return value !== "";
  };

  const isANumber = (value) => {
    return !!Number(value);
  };

  const validators = {
    title: {
      required: isNotEmpty,
    },
    name: {
      required: isNotEmpty,
    },
    bid: {
      required: isNotEmpty,
      isANumber: isANumber,
    },
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
  // const history = useHistory();

  useEffect(() => {
    const unsubscribe = () =>
      db.collection("auctions").onSnapshot((snapshot) => {
        const items = [];
        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          items.push(docData);
        });
        setAuctionItems(items);
      });
    unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = () =>
      db
        .collection("auctions")
        .where("expiryDate", ">=", new Date())
        .onSnapshot((snapshot) => {
          const items = [];
          snapshot.docs.forEach((doc) => {
            const docData = doc.data();
            docData.id = doc.id;
            items.push(docData);
          });
          setFilteredItems(items);
        });
    unsubscribe();
  }, []);

  /*   function handleButtonNew(e) {
    console.log(e.target);
    history.push("/auction/new");
  } */

  function handleCheckbox(e) {
    setIsChecked(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    setErrors({
      title: "",
      name: "",
      bid: "",
    });
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      const [currentItem] = auctionItems.filter(
        (item) => item.id === fieldValues.title
      );
      const currentBid = parseInt(fieldValues.bid);
      const highestBid = parseInt(currentItem.highestBid);
      const currentDate = new Date();
      const expiryDate = new Date(currentItem.expiryDate.toDate());

      let isExpired = false;
      if (expiryDate <= currentDate) {
        isExpired = true;
        setAlert({ alertType: "danger", message: messageTypes.over });
        setFieldValues({
          title: "",
          name: "",
          bid: "",
        });
      }

      if (!isExpired && currentBid <= highestBid) {
        setAlert({ alertType: "danger", message: messageTypes.smallBid });
      }

      if (!isExpired && currentBid > parseInt(currentItem.highestBid)) {
        setAlert({alertType: "success", message: messageTypes.success});
       // await saveNewHighestBid(currentItem.docId);
       const auctionRef = db.collection("auctions").doc(currentItem.id);
       auctionRef.update({
         highestBid: currentBid,
         highestBidderName: fieldValues.name,
       });

        setFieldValues({
          title: "",
          name: "",
          bid: "",
        });
      }
    }  else {
      setFormWasValidated(true);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    /*     const ix = e.target.options ? e.target.options.selectedIndex : null;
    const id = e.target.options ? e.target.options[ix].dataset.id : "";
     */
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
    <div>
      <h1 className="mt-4 mb-4">Online Auction House</h1>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="filter"
          name="filter"
          onChange={handleCheckbox}
          checked={false}
        />
        <label className="form-check-label mb-3" htmlFor="filter">
          Lejárt aukciók szűrése
        </label>
      </div>
      <table className="mb-4 table table-striped table-bordered">
        <thead>
          <tr>
            <th>Tétel címe </th>
            <th>Legmagasabb limit </th>
            <th>Licitáló neve </th>
            <th>Lejárati idő </th>
          </tr>
        </thead>
        <tbody>
          {isChecked
            ? filteredItems.map((item) => (
                <AuctionTable
                  key={item.id}
                  title={item.title}
                  highestBid={item.highestBid}
                  highestBidderName={item.highestBidderName}
                  expiryDate={item.expiryDate}
                />
              ))
            : auctionItems.map((item) => (
                <AuctionTable
                  key={item.id}
                  title={item.title}
                  highestBid={item.highestBid}
                  highestBidderName={item.highestBidderName}
                  expiryDate={item.expiryDate}
                />
              ))}
        </tbody>
      </table>
      <Link to="/auction/new">
        <button
          className="btn btn-primary mb-4"
          /*           type="button"
          onClick={handleButtonNew} */
        >
          Új hozzáadása
        </button>
      </Link>
      <div></div>
      <h2 className="mb-4">Licit leadása</h2>
      {alert && <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>}
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${formWasValidated ? "was-validated" : ""}`} 
      >
        <InputItem
          label="Tétel megnevezése"
          type="select"
          name="title"
          value={fieldValues.title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          options={isChecked ? filteredItems : auctionItems}
          reference={references.title}
          errors={errors}
        />

        <InputItem
          label="Licitáló neve"
          type="text"
          name="name"
          value={fieldValues.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.name}
          errors={errors}
        />
        <InputItem
          label="Tét"
          type="text"
          name="bid"
          value={fieldValues.bid}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={true}
          reference={references.bid}
          errors={errors}
        />
        <button
          className="btn btn-primary mb-4"
          type="submit"
          // onClick={handleButtonBid}
        >
          Licit
        </button>
      </form>
      {/*       {formAlertText &&
      <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
        {formAlertText}
      </div>
      } */}
    </div>
  );
}
