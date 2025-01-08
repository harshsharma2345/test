import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Itemform.css";
function TableList() {
  const [tabularData, setTabularData] = useState([]);

  useEffect(() => {
    fetchTabularData();
  }, []);

  const fetchTabularData = () => {
    axios
      .get(
        "https://apis-technical-test.conqt.com/Api/Item-Supplier/Get-All-Items"
      )
      .then(function (response) {
        setTabularData(response.data.data.items);
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

  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>City</th>
            <th>Country</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {tabularData &&
            tabularData.map((item, idx) => {
              return (
                <>
                  {" "}
                  <tr>
                    <td>{item.Supplier.supplierName}</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.Supplier.cityName}</td>
                    <td>{item.Supplier.countryName}</td>
                    <td>{item.Supplier.email}</td>
                    <td>{item.Supplier.phoneNumber}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
