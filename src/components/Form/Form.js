import React from "react";

import "./Form.css";
import Logo from "../Logo/Logo";

function Form(props) {
  return (
    <form className="form" onSubmit={props.onSubmit}>
      <Logo />
      <h2 className="form__title">{props.title}</h2>
      <fieldset className="form__input-container">{props.children}</fieldset>
      {props.link}
    </form>
  );
}

export default Form;
