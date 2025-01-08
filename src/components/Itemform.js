import React, { useEffect, useState } from "react";
import "./Itemform.css";
import axios from "axios";
import Button from "@mui/material/Button";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
function Itemform() {
  const [itemFormData, setItemFormData] = useState({
    itemName: "",
    quantity: "",
    unitPrice: "",
    submissionDate: "2021-07-21",
    currency: "$",
  });
  const [showDataSubmitted, setShowDataSubmitted] = useState("");

  const [supplierFormData, setSupplierFormData] = useState({
    supplierName: "",
    companyName: "",
    countryId: "",
    stateId: "",
    cityId: "1",
    email: "",
    phoneCode: "+91",
    phoneNumber: "7007402688",
  });

  const [countryList, setCountryList] = useState(null);
  const [stateList, setStateList] = useState(null);
  const [cityList, setCityList] = useState(null);
  const [lengthValidators, setLengthValidators] = useState(false);
  const [numericValidators, setNumericValidators] = useState(false);
  const [emailValidators, setEmailValidators] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList"
      )
      .then(function (response) {
        setCountryList(response.data.data.countyList);
        // handle success
        console.log(response.data.data.countyList);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const saveData = () => {
    console.log(supplierFormData);
    validator();
    axios
      .post(
        "https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers",
        {
          itemDetails: itemFormData,
          supplier: supplierFormData,
        }
      )
      .then(function (response) {
        console.log(response);
        setShowDataSubmitted(response.message);
      })
      .catch(function (error) {
        console.log(error);
        setShowDataSubmitted(error.response.data.message);
      });
  };

  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");

  const handleCountryChange = (event) => {
    setCountryId(event.target.value);
    getstatelistbycountry(countryId);
  };

  const handleStateChange = (event) => {
    setStateId(event.target.value);
    getcitylistbystateandcountry(countryId, stateId);
  };

  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const getstatelistbycountry = (id) => {
    axios
      .get(
        `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${id}`
      )
      .then(function (response) {
        setStateList(response.data.data.stateList);
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const getcitylistbystateandcountry = (countryId, stateId) => {
    axios
      .get(
        `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${countryId}&stateId=${stateId}`
      )
      .then(function (response) {
        setCityList(response.data.data.cityList);
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  const validator = () => {
    if (itemFormData.itemName.length > 50) {
      setLengthValidators(true);
    }
    if (isNaN(itemFormData.currency)) {
      setNumericValidators(true);
    }
    if (!isValidEmail) {
      setEmailValidators(true);
    }
  };
  return (
    <div className="parent">
      <h1>Item Details</h1>
      <div className="parentItemFormContainer">
        <div className="form">
          <div className="formrow">
            <div className="formField">
              <label htmlFor="Item Name">Item Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setItemFormData({
                    ...itemFormData,
                    itemName: e.target.value,
                  });
                }}
                placeholder="Enter item name"
              />
              {lengthValidators ? (
                <div style={{ color: "red" }}>
                  {" "}
                  Length is more than 50 chars{" "}
                </div>
              ) : null}
            </div>
            <div className="formField">
              <label htmlFor="Quantity">Quantity</label>
              <input
                type="text"
                onChange={(e) => {
                  setItemFormData({
                    ...itemFormData,
                    quantity: e.target.value,
                  });
                }}
                placeholder="Enter item quantity"
              />
              {numericValidators ? (
                <div style={{ color: "red" }}> Should be number </div>
              ) : null}
            </div>
          </div>
          <div className="formrow">
            <div className="formField">
              <label htmlFor="Quantity">Unit Price</label>
              <input
                type="text"
                onChange={(e) => {
                  setItemFormData({
                    ...itemFormData,
                    unitprice: e.target.value,
                  });
                }}
                placeholder="Enter unit price"
              />
              {numericValidators ? (
                <div style={{ color: "red" }}> Should be number </div>
              ) : null}
            </div>
            <div className="formField">
              <label htmlFor="Quantity">Date of Submission</label>
              <input
                type="text"
                onChange={(e) => {
                  setItemFormData({
                    ...itemFormData,
                    dateofsubmission: e.target.value,
                  });
                }}
                placeholder="Enter date of submission"
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(e) => {
                    setItemFormData({
                      ...itemFormData,
                      dateofsubmission: e.target.value,
                    });
                  }}
                />
              </LocalizationProvider> */}
            </div>
          </div>
        </div>
      </div>
      <h1>Supplier Details</h1>
      <div className="parentSupplierFormContainer">
        <div className="form">
          <div className="formrow">
            <div className="formField">
              <label htmlFor="Item Name">Supplier Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setSupplierFormData({
                    ...supplierFormData,
                    supplierName: e.target.value,
                  });
                }}
                placeholder="Enter supplier name"
              />
            </div>
            <div className="formField">
              <label htmlFor="Quantity">Company Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setSupplierFormData({
                    ...supplierFormData,
                    companyName: e.target.value,
                  });
                }}
                placeholder="Enter company name"
              />
            </div>
          </div>
          <div className="formrow">
            <div className="formField">
              <label htmlFor="Quantity">Country</label>
              <select
                name="countrylist"
                id="countrylist"
                value={countryId}
                onChange={(e) => {
                  setSupplierFormData({
                    ...supplierFormData,
                    countryId: countryId,
                  });
                  handleCountryChange(e);
                }}
              >
                <option value="">-- Select a country --</option>

                {countryList &&
                  countryList.map((item, idx) => {
                    return (
                      <>
                        <option key={item.countryId} value={item.countryId}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="Quantity">State</label>
              <select
                name="stateList"
                id="stateList"
                value={stateId}
                onChange={(e) => {
                  handleStateChange(e);
                  setSupplierFormData({
                    ...supplierFormData,
                    stateId: stateId,
                  });
                }}
              >
                {stateList &&
                  stateList.map((item, idx) => {
                    return (
                      <>
                        <option key={item.stateId} value={item.stateId}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="formrow">
            <div className="formField">
              <label htmlFor="Quantity">City</label>
              <select
                name="citylist"
                id="citylist"
                value={cityId}
                onChange={(e) => {
                  handleCityChange(e);
                  setSupplierFormData({
                    ...supplierFormData,
                    cityId: cityId,
                  });
                }}
              >
                {cityList &&
                  cityList.map((item, idx) => {
                    return (
                      <>
                        <option key={item.cityId} value={item.cityId}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="Quantity">Email Address</label>
              <input
                type="text"
                onChange={(e) => {
                  setSupplierFormData({
                    ...supplierFormData,
                    email: e.target.value,
                  });
                }}
                placeholder="Enter email address"
              />
              {emailValidators ? <div> Should be valid format </div> : null}
            </div>
          </div>
        </div>
      </div>
      <h1>Submitted Data</h1>
      <p>Data submitted by user will be shown below</p>
      <Button
        variant="contained"
        onClick={() => {
          saveData();
        }}
      >
        Save Changes
      </Button>
      <div style={{ color: "red" }}>{showDataSubmitted}</div>
    </div>
  );
}

export default Itemform;
