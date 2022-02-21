import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox() {
  return (
    <div className="filter">
      <p className="filter__name">Короткометражки</p>
      <label className="filter__switch">
        <input type="checkbox" className="filter__box" />
        <span className="filter__slider"></span>
      </label>
    </div>
  );
}

export default FilterCheckBox;
