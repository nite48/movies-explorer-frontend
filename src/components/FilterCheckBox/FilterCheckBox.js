import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox() {
  return (
    <div className="filter">
      <label className="filter__switch">
        <input type="checkbox" className="filter__box" />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__name">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
