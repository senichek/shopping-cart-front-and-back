import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from "react-router-dom";
import Button from './Button';

function TopBar() {

  let location = useLocation();

 // Used to redirect a user to a specific URL.
  let navigate = useNavigate();

  const redirect = (URL) => {
    navigate(URL);
  }
  /* We do not need topBar on the login page this is why we return null
  if the location is /login */
  if (location.pathname === '/') {
    return null;
  } else {
    return <div className='app-top-bar'>
    <a href="/shop"> <h1>My Store</h1> </a>
    <Button color={'green'} text={'Admin page'} click={() => redirect('/admin')}/>
    <Button color={'white'} text={<FontAwesomeIcon icon={faShoppingCart} size='2x' />} click={() => redirect('/cart')}/>
</div>;
  }
}

export default TopBar;
