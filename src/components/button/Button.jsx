import React from "react";

import "./button.styles.scss";

const button_types = {
  inverted: "inverted",
  google: "google-sign-in",
};

const Button = ({ children, buttonType, ...otherprops }) => {
  return (
    <button
      className={`button-container ${button_types[buttonType]}`}
      {...otherprops}
    >
      {children}
    </button>
  );
};

export default Button;
