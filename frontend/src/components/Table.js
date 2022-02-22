import React from "react";
import DataTable from "react-data-table-component";
import { Fragment } from "react/cjs/react.production.min";
import Button from "./Button";

// https://react-data-table-component.netlify.app/
function Table({ products, onUpdateClick, onDeleteClick }) {
  const columns = [
    {
      name: "Product",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Action",
      cell: (value) => {
        return (
          <Fragment>
            <Button
              color={"green"}
              text={"Update"}
              click={() => onUpdateClick(value)}
            />
            &nbsp;
            <Button
              color={"#cc0909"} // dark red
              text={"Delete"}
              click={() => onDeleteClick(value._id)}
            />
          </Fragment>
        );
      },
    },
    {},
  ];

  return (
    <div>
      <DataTable columns={columns} data={products} pagination />
    </div>
  );
}

export default Table;
