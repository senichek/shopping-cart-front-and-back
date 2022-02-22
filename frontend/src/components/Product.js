import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function Product({ product }) {

  // Used to redirect a user to a specific URL.
  let navigate = useNavigate();

  const redirect = (URL) => {
    navigate(URL);
  };
    
    const notify = (productName) => {
      NotificationManager.warning('when the price drops below 700 EUR', 'You will be notified', 2000);
     // alert('You will be notified when the price of <' + productName + '> drops below 700 EUR')
  }
  // The expression <product.price > 700 &&> means that we 
  // will show the button if the price is higher than 700,
  // otherwise we do nothing.
  // https://reactjs.org/docs/conditional-rendering.html
  return (
    <div>
      <NotificationContainer />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>
      <Button color={'#1976d2'} text={'See details'} click={() => redirect(`/details/${product._id}`)}/>
      </p>
      {product.price > 700 && 
        <Button color={'green'} text={'Notify me'} click={() => notify(product.title)}/>
      }
      <p>****************************</p>
    </div>
  );
}

export default Product;
