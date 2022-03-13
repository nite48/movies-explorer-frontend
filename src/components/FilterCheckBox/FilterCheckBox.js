import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox({ onCheckbox }) {
  const [isChecked, setChecked] = React.useState(false);
  function onChange(event) {
    onCheckbox(!isChecked);
    setChecked(event.target.checked);
  }
  return (
    <div className="filter">
      <label className="filter__switch">
        <input
          type="checkbox"
          className="filter__box"
          name="switch"
          id="switch"
          checked={isChecked}
          onChange={(e) => onChange(e)}
        />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__name">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
