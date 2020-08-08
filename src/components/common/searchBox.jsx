import React from "react";
import Input from "./input.jsx";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
