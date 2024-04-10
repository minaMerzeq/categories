import React from "react";
import Select from "react-select";

const SearchableDropdown = ({
  options,
  selectedOption,
  handleChange,
  label,
  required,
}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="dropdown"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Select
        id="dropdown"
        name={label}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        className="w-full"
        required={required}
      />
    </div>
  );
};

export default SearchableDropdown;
