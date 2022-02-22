import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Cart({ products, onClearCart }) {
  // Used to redirect a user to a specific URL.
  let navigate = useNavigate();

  const redirect = (URL) => {
    navigate(URL);
  };

  // products.length > 0 && - we will show buttons only if there are products in the cart.
  // otherwise do nothing.
  return (
    <div>
      {products.map((pr) => {
        return (
          <h3 key={pr._id}>
            {" "}
            {pr.title} = {pr.quantity}
          </h3>
        );
      })}
      {products.length > 0 && (
        <p>
          <Button
            color={"green"}
            text={"Checkout"}
            click={() => redirect("/checkout")}
          />
          &nbsp;
          <Button
            color={"#cc0909"} //dark red
            text={"Clear cart"}
            click={onClearCart}
          />
        </p>
      )}

{products.length <= 0 && (
        <h3>The cart is empty.</h3>
      )}

      <p>
        <Button
          color={"#1976d2"}
          text={"Go back to store"}
          click={() => redirect("/shop")}
        />
      </p>
    </div>
  );
}

export default Cart;
