import React, { useEffect, useState } from "react";
import { getProduct } from "../services";
import "./table.css";

function TableComp() {
  const [tableData, settableData] = useState([]);
  const [pageData, setpageData] = useState(1);
  const getTableData = async () => {
    const { data, err } = await getProduct();
    if (data) {
      settableData(data);
    } else if (err) {
      console.log(err, "error message");
    }
  };
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <table
        style={{
          border: "1px solid black",
          padding: "10px",
          borderSpacing: "0px",
        }}
        data-testid="table"
      >
        <tr>
          <th className="heading">Id</th>
          <th className="heading">Title</th>
          <th className="heading">Image</th>
          <th className="heading">Category</th>
          <th className="heading">Price</th>
          <th className="heading">Description</th>
        </tr>
        {tableData.slice(pageData * 10 - 10, pageData * 10).map((ele) => {
          return (
            <tr className="row">
              <td style={{ border: "1px solid black", padding: "0px" }}>
                {ele.id}
              </td>
              <td style={{ border: "1px solid black" }}>{ele.title}</td>
              <td style={{ border: "1px solid black" }}>
                <img
                  src={ele.image}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td style={{ border: "1px solid black" }}>{ele.category}</td>
              <td style={{ border: "1px solid black" }}>{`₹${ele.price}`}</td>
              <td
                style={{ border: "1px solid black" }}
              >{`${ele.description.substring(0, 30)}...`}</td>
            </tr>
          );
        })}
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <span
          onClick={() => {
            if (pageData == 1) {
            } else {
              setpageData(pageData - 1);
            }
          }}
          className="pagination"
          style={{
            fontSize: "30px",
            fontWeight: "500px",
            border: pageData !== 1 ? "1px solid blue" : "1px solid gray",
            cursor: "pointer",
            color: pageData == 1 ? "gray" : "blue",
            borderRadius: "10px",
            height: "40px",
            width: "80px",
          }}
        >
          {"<"}
        </span>
        <span
          onClick={() => {
            if (Math.floor(tableData.length / 10) == pageData) {
            } else {
              setpageData(pageData + 1);
            }
          }}
          className="pagination"
          style={{
            fontSize: "30px",
            fontWeight: "500px",
            border:
              Math.floor(tableData.length / 10) !== pageData
                ? "1px solid blue"
                : "1px solid gray",
            cursor: "pointer",
            color:
              Math.floor(tableData.length / 10) == pageData ? "gray" : "blue",
            borderRadius: "10px",
            height: "40px",
            width: "80px",
          }}
        >
          {">"}
        </span>
      </div>
    </div>
  );
}

export default TableComp;
