import React from "react";
import "./FilterCheckBox.css";
// import { Route } from "react-router-dom";

function FilterCheckBox({ onCheckbox }) {
  const [isChecked, setChecked] = React.useState(false);
  // const [isCheckedSaved, setCheckedSaved] = React.useState(false);
  function onChange(event) {
    onCheckbox(!isChecked);
    setChecked(event.target.checked);
    localStorage.setItem('lastCheckBoxState', JSON.stringify(!isChecked));
  }
  // function onChangeSaved(event) {
  //   onCheckbox(!isCheckedSaved);
  //   setCheckedSaved(event.target.checked);
  //   localStorage.setItem('lastCheckBoxStateSaved', JSON.stringify(!isCheckedSaved));
  // }
  React.useEffect(() => {
    const lastCheckBoxState = JSON.parse(localStorage.getItem('lastCheckBoxState'));
    if (lastCheckBoxState) {
      setChecked(lastCheckBoxState);
    }
  }, []);
  // React.useEffect(() => {
  //   const lastCheckBoxState = JSON.parse(localStorage.getItem('lastCheckBoxStateSaved'));
  //   if (lastCheckBoxState) {
  //     setCheckedSaved(lastCheckBoxState);
  //   }
  // }, []);
  return (
    <>
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
  </>
  );
}

export default FilterCheckBox;
