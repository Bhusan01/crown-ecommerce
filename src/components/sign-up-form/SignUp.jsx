import React, { useState } from "react";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import {
  createUserwithPasswordandEmail,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

import "./sign-up.styles.scss";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, displayName, confirmPassword, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultformFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.confirmPassword !== formFields.password) {
      alert("password is not the same");
      return;
    }
    try {
      const { user } = await createUserwithPasswordandEmail(
        formFields.email,
        formFields.password
      );

      await createUserDocument(user, displayName);

      resetFormField();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="display name"
          required
          onChange={handleChange}
          type="text"
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="email"
          required
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
        />
        <FormInput
          label="password"
          required
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
        />
        <FormInput
          label="confrm password"
          required
          onChange={handleChange}
          type="text"
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit"> sign up</Button>
      </form>
    </div>
  );
};

export default SignUp;
