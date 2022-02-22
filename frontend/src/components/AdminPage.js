import React from "react";
import { useState } from "react";
import Table from "./Table";
import Button from "./Button";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Login from "./Login"
// https://www.npmjs.com/package/react-notifications
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

// if <showAddProduct> we will show the component, if not - do nothing.
function AdminPage({ products, onUpdateClick, onDeleteClick, onAddClick, onSaveClick, onSaveUpdateClick, showAddProduct, showUpdateProductForm, productToUpdate }) {
  // onUpdateClick just toggles the product update form.

  /* The component (the admin page) gets re-rendered
  every time we change the state (i.e. when we 
    setLoggedInUser() to a different value.) */
const [loggedIn, setLoggedInUser] = useState([]);

const login = async (email, password) => {
  const credentials = {
    email: email,
    password: password
  }
  const response = await fetch('http://127.0.0.1:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  const userData = await response.json();
  
  /* If the user data has token it means that the user
  has been authenticated. */
  // We will access localStorage on the admin page
  if (userData.token) {
    localStorage.setItem(
      "LOGGED_IN_USER",
      JSON.stringify(userData));
      setLoggedInUser(userData); // it will trigger re-render of the component.
  } else {
    NotificationManager.warning(
      " Bad credentials.",
      "Failed to log you in.",
      2000
    );
  }
}

const logout = () => {
localStorage.removeItem("LOGGED_IN_USER");
// It will trigger re-render of the component.
setLoggedInUser([]); // Empty array because there is no loggedInUser after the logout.
}

const loggedInUser = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));

  if (loggedInUser != null && loggedInUser.token && loggedInUser.role === "Admin") {
    return (
      <div>
        <h3>All the available products:</h3>
        <Button color={"#1976d2"} text={"Add new product"} click={onAddClick} />
        {showAddProduct && <div><AddProduct onSaveClick={onSaveClick} /></div> }
        
        <Table
          products={products}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
        {showUpdateProductForm && <UpdateProduct onSaveUpdateClick={onSaveUpdateClick} onCancelClick={onUpdateClick} productToUpdate={productToUpdate} />}

        <br></br>
        <Button color={"#cc0909"} text={"LOGOUT"} click={logout} />

      </div>
    );
  } else {
    return <>
    <h2 style={{textAlign: 'center'}}>You must be logged as ADMIN to view this page</h2>
    <h3 style={{textAlign: 'center'}}>Login: john@gmail.com</h3>
    <h3 style={{textAlign: 'center'}}>Password: pass111</h3>
    <Login onLoginClick={login}/>
    </>
  }
  
}

export default AdminPage;
