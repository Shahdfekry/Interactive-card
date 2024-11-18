import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCVC] = useState("");
  // errors
  const [blankErrors, setBlankErrors] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [numberErrors, setNumberErrors] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [showForm, setShowForm] = useState(true);

  /* handlers */
  const handleBlankError = (field, value) => {
    setBlankErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value === "" ? "Can't be blank" : "",
    }));
  };
  const handleNumberError = (field, value) => {
    setNumberErrors((prevErrors) => ({
      ...prevErrors,
      [field]: /[^0-9\s]/.test(value) ? "Wrong format, numbers only" : "",
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    let hasError = false;
    const fields = { name, cardNumber, month, year, cvc };

    Object.keys(fields).forEach((field) => {
      if (!fields[field]) {
        handleBlankError(field, "");
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }

    setShowForm(false);
  }
  function handleReset() {
    setShowForm(true);
    setName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCVC("");
  }
  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\s+/g, "");
    return cleanedValue.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="container">
      <Card
        name={name}
        cardNumber={cardNumber}
        month={month}
        year={year}
        cvc={cvc}
      />
      {showForm ? (
        <Form
          name={name}
          setName={(value) => {
            setName(value);
            handleBlankError("name", value);
          }}
          cardNumber={cardNumber}
          setCardNumber={(value) => {
            const formattedValue = formatCardNumber(value);
            setCardNumber(formattedValue);
            handleBlankError("cardNumber", value);
            handleNumberError("cardNumber", value);
          }}
          month={month}
          setMonth={(value) => {
            setMonth(value);
            handleBlankError("month", value);
            handleNumberError("month", value);
          }}
          year={year}
          setYear={(value) => {
            setYear(value);
            handleBlankError("year", value);
            handleNumberError("year", value);
          }}
          cvc={cvc}
          setCVC={(value) => {
            setCVC(value);
            handleBlankError("cvc", value);
            handleNumberError("cvc", value);
          }}
          blankErrors={blankErrors}
          numberErrors={numberErrors}
          handleSubmit={handleSubmit}
        />
      ) : (
        <CompletedState handleReset={handleReset} />
      )}
    </div>
  );
}

function Card({ name, cardNumber, month, year, cvc }) {
  return (
    <div className="card">
      <div className="card-back">
        <img src="/images/bg-card-back.png" alt="card back" />
        <div className="CVC">
          <p>{cvc ? cvc : "000"}</p>
        </div>
      </div>
      <div className="card-front">
        <img src="/images/bg-card-front.png" alt="card front" />
        <div className="circles">
          <div className="white-circle"></div>
          <div className="transparent-circle"></div>
        </div>
        <div className="card-details">
          <div class="card-number">
            {cardNumber ? cardNumber : <p>0000 0000 0000 0000</p>}
          </div>
          <div className="row">
            <p class="card-name">{name ? name : "JANE APPLESEED"}</p>
            <p class="card-expiry">
              {month ? month : "00"}/{year ? year : "00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Form({
  name,
  setName,
  cardNumber,
  setCardNumber,
  month,
  setMonth,
  year,
  setYear,
  cvc,
  setCVC,
  blankErrors,
  numberErrors,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-info">
        <div className="name">
          <label>CARDHOLDER NAME</label>
          <input
            className={blankErrors.name ? "error" : ""}
            type="text"
            placeholder="e.g. Jane Appleseed"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {blankErrors.name && (
            <span className="error-message">{blankErrors.name}</span>
          )}
        </div>
        <div className="card-num">
          <label>CARD NUMBER</label>
          <input
            className={
              blankErrors.cardNumber || numberErrors.cardNumber ? "error" : ""
            }
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {blankErrors.cardNumber && (
            <span className="error-message">{blankErrors.cardNumber}</span>
          )}
          {numberErrors.cardNumber && (
            <span className="error-message">{numberErrors.cardNumber}</span>
          )}
        </div>
        <div className="date-cvc">
          <div className="date">
            <label>EXP. DATE (MM/YY)</label>
            <span>
              <div className="wrapper">
                <input
                  className={
                    blankErrors.month || numberErrors.month ? "error" : ""
                  }
                  type="text"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                {blankErrors.month && (
                  <span className="error-message">{blankErrors.month}</span>
                )}
                {numberErrors.month && (
                  <span className="error-message">{numberErrors.month}</span>
                )}
              </div>
              <div className="wrapper">
                <input
                  className={
                    blankErrors.year || numberErrors.year ? "error" : ""
                  }
                  type="text"
                  placeholder="YY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                {blankErrors.year && (
                  <span className="error-message">{blankErrors.year}</span>
                )}
                {numberErrors.year && (
                  <span className="error-message">{numberErrors.year}</span>
                )}
              </div>
            </span>
          </div>
          <div className="cvc">
            <label>CVC</label>
            <input
              className={blankErrors.cvc || numberErrors.cvc ? "error" : ""}
              type="text"
              placeholder="e.g. 123"
              value={cvc}
              onChange={(e) => setCVC(e.target.value)}
            />
            {blankErrors.cvc && (
              <span className="error-message">{blankErrors.cvc}</span>
            )}
            {numberErrors.cvc && (
              <span className="error-message">{numberErrors.cvc}</span>
            )}
          </div>
        </div>
        <Button>Confirm</Button>
      </div>
    </form>
  );
}

function CompletedState({ handleReset }) {
  return (
    <div className="completed-state">
      <div className="icon-complete">
        <img src="/images/icon-complete.svg" alt="icon-complete" />
      </div>
      <h1>THANK YOU!</h1>
      <p>We've added your card details</p>
      <Button handleReset={handleReset}>Continue</Button>
    </div>
  );
}
function Button({ children, handleReset }) {
  return (
    <button type="submit" className="btn" onClick={handleReset}>
      {children}
    </button>
  );
}
export default App;
