import { useEffect, useState } from "react";
import SearchableDropdown from "./components/SearchableDropdown";
import { getCats, getProps } from "./services/catService";
import OptionDropdown from "./components/OptionDropdown";

function App() {
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [mainCats, setMainCats] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [subCats, setSubCats] = useState([]);
  const [props, setProps] = useState([]);

  const handleMainCatChange = (selectedOption) => {
    setSelectedMainCat(selectedOption);
    setSubCats(
      selectedOption?.children.map((cat) => ({
        ...cat,
        label: cat.name,
        value: cat.name,
      }))
    );
    setSelectedSubCat(null);
    setProps([]);
  };
  const handleSubCatChange = (selectedOption) => {
    setProps([]);
    setSelectedSubCat(selectedOption);
    getProps(selectedOption?.id).then((response) => {
      if (response.data.code === 200) setProps(response.data?.data);
    });
  };

  const [submitData, setSubmitData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Access form controls via event.target.elements
    const formControls = event.target.elements;

    const data = [];

    for (let i = 0; i < formControls.length; i++) {
      const control = formControls[i];
      if (control.name && control.value !== "other")
        data.push({
          name: control.name,
          value: control.value,
        });
    }

    setSubmitData(data);
  };

  useEffect(() => {
    getCats().then((response) => {
      if (response.data.code === 200)
        setMainCats(
          response.data?.data.categories.map((cat) => ({
            ...cat,
            label: cat.name,
            value: cat.name,
          }))
        );
    });
  }, []);

  return (
    <div className="m-4">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SearchableDropdown
          label={"Main Category"}
          options={mainCats}
          selectedOption={selectedMainCat}
          handleChange={handleMainCatChange}
          required={true}
        />
        <SearchableDropdown
          label={"Sub Category"}
          options={subCats}
          selectedOption={selectedSubCat}
          handleChange={handleSubCatChange}
          required={true}
        />
        <div className="flex flex-col gap-5">
          {props?.map((prop) => (
            <OptionDropdown option={prop} />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <table className="table-auto w-full mt-2">
        <thead className="border-b border-gray-200">
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {submitData?.map((data, index) => (
            <tr key={index} className="">
              <td>{data.name}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
