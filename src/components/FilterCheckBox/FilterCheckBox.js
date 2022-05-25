import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox(props) {
  return (
    <>
      <div className="filter">
        <label className="filter__switch">
          <input
            type="checkbox"
            className="filter__box"
            name="switch"
            id="switch"
            checked={props.isChecked}
            onChange={props.onFilter}
          />
          <span className="filter__slider"></span>
        </label>
        <p className="filter__name">Короткометражки</p>
      </div>
  </>
  );
}

export default FilterCheckBox;
