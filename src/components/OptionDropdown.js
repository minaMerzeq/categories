import React, { useState } from "react";
import SearchableDropdown from "./SearchableDropdown";
import { getOptChid } from "../services/catService";

const OptionDropdown = ({ option }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [child, setChild] = useState(null);
  const [other, setOther] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setOther(false);
    setChild(null);
    if (selectedOption.child) {
      getOptChid(selectedOption.id).then((response) => {
        if (response.data.code === 200) setChild(response.data.data[0]);
      });
    } else if (selectedOption.value === "other") {
      setOther(true);
    }
  };

  return (
    <div className="flex flex-col gap-5 ml-4">
      <SearchableDropdown
        options={[
          ...option?.options?.map((opt) => ({
            ...opt,
            label: opt.name,
            value: opt.name,
          })),
          {
            label: "other",
            value: "other",
          },
        ]}
        selectedOption={selectedOption}
        handleChange={handleChange}
        label={option?.name}
      />
      {child && <OptionDropdown option={child} />}
      {other && (
        <input
          className=" p-1 -mt-2 block w-full rounded border-gray-300 border shadow-sm"
          type="text"
          name={option?.name}
        />
      )}
    </div>
  );
};

export default OptionDropdown;
