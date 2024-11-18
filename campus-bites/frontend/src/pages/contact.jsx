import React, { useState } from "react";
import "../CSS/contact.css"; // Import CSS file for styling
import contactimage from "../assets/contact.png";

const ContactPage = () => {
  // State variables to hold form data
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = [
      { value: FirstName, id: "FirstName" },
      { value: LastName, id: "LastName" },
      { value: PhoneNumber, id: "PhoneNumber" },
      { value: Email, id: "Email" },
    ];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        setWarning(`Please fill out the ${inputs[i].id} field.`);
        return;
      }
    }

    console.log("Form submitted!");

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setMessage("");
    setWarning("");
    setSuccess("Data has been recorded successfully!");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="contact">
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <div className="form-of-contact">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input className="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input className="phoneNumber"
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input className="email3"
              id="email"
              type="email"
              placeholder="Email"
              
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input className="address"
              id="address"
              type="text"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea className="message"
              id="message"
              placeholder="Message"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {warning && <p className="warning">{warning}</p>}
          {success && <p className="success">{success}</p>}
          <button  className="submit2" type="submit">Submit</button>
        </form>
        </div>
      </div>
      <div className="contact-image">
        <img src={contactimage} alt="contact"  />
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
