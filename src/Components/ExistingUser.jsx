import React from "react";

export const ExistingUser = ({ email, handleChange, handleClick }) => {
  return (
    <div className="main">
      <h3>Email</h3>
      <div className="form">
        <input
          className="input"
          type="email"
          placeholder="Enter Email"
          inputMode="email"
          onChange={handleChange}
        />
        <p>* Please use the registered Email.</p>
        <button id="submit-btn" onClick={() => handleClick(email)}>
          Submit
        </button>
      </div>
    </div>
  );
};
