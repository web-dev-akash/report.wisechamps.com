import React from "react";

export const NoUserFound = ({ setMode }) => {
  return (
    <div className="email-not-found">
      <p>
        This Email is not registered with us. <br />
        Please use a registered Email Address
      </p>
      <div>
        <button id="submit-btn" onClick={() => setMode("")}>
          Try Again
        </button>
        <button
          id="submit-btn"
          onClick={() => {
            window.open(
              `https://wa.me/919717094422?text=${encodeURIComponent(
                "Please send me my registered email"
              )}`,
              "_blank"
            );
            setMode("");
          }}
        >
          Get Your Registered Email
        </button>
      </div>
    </div>
  );
};
