import * as React from "react";


export default function BasicSelect(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };

  return (
    <select value={props.value} onChange={handleChange}>
      {Object.keys(props.optionMap).map((optionCode) => {
        return (
          <option key={optionCode} value={optionCode}>
            {props.optionMap[optionCode]}
          </option>
        );
      })}
    </select>
  );
}
