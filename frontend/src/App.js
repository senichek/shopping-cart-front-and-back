import ProductList from "./components/ProductList";
import TopBar from "./components/TopBar";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import AdminPage from "./components/AdminPage";
// https://www.npmjs.com/package/react-notifications
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Greeting from "./components/Greeting";

function App() {

  const [products, setProducts] = useState([]);

  // Container for the product we'd like to update.
  let [productToUpdate, setProductToUpdate] = useState([]);

  // Variables responsible for showing the "add new product" form.
  // and the forms of checkout page.
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCheckoutForms, setShowCheckoutForms] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  

  // This function persists the products across the page reloads.
  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts();
      setProducts(productsFromServer);
    };
    getProducts();
  }, []);

  // Fetch products from server
  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:3001/item/all");
    const data = await res.json();
    return data;
  };

  // Empty array for adding the items in Cart
  const [itemsInCart, setItemsInCart] = useState([]);

  // To prevent the items from disapearing from the Cart page when the page is reloaded
  // we need to use useEffect and localStorage.
  useEffect(() => {
    // Getting the items from the storage.
    const cartItemsFromStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_ITEMS_KEY)
    );
    if (cartItemsFromStorage) setItemsInCart(cartItemsFromStorage);
  }, []); // We pass empty array. The empty array never changes, this is why
  // this <useEffect> will be called only once.

  // Setting the items to the storage.
  const LOCAL_STORAGE_CART_ITEMS_KEY = "items.in.cart";
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_CART_ITEMS_KEY,
      JSON.stringify(itemsInCart)
    );
  }, [itemsInCart]); // if the [itemsInCart] changes, the <useEffect> will be called.

  const addToCart = (product) => {
    // Creating the copy of the item to put it into the cart.
    // If we do not create the copy, then we will modify the quantity
    // of the item from the <products> and this is something we do not need.
    var itemToAdd = Object.assign({}, product, { quantity: 1 });
    if (isAvailableForPurchase(products, itemsInCart, itemToAdd)) {
      let present = itemsInCart.find((x) => x._id === itemToAdd._id);
      if (present) {
        // If it is present, then we modify the quantity.
        let index = itemsInCart.indexOf(present);
        itemsInCart[index].quantity += 1;
        setItemsInCart(itemsInCart.slice()); // Slice returns new array, we need new array so that
                                            // useEffect detects the change.
      } else {
        // Adding new item to the array of those that are already present in the array.
        setItemsInCart([...itemsInCart, itemToAdd]);
        NotificationManager.success(
          "has beed added to your cart.",
          itemToAdd.title,
          2000
        );
      }
    } else {
      NotificationManager.warning(
        " is out of stock, sorry.",
        product.title,
        2000
      );
      return;
    }
  };

  const decreaseQuantity = (product) => {
    if (product.quantity === 0) {
      return;
    } else {
      let index = itemsInCart.indexOf(product);
      itemsInCart[index].quantity -= 1;
      // Slice returns new array, we need new array so that useEffect detects the change.
      setItemsInCart(itemsInCart.slice());
    }
  };

  const increaseQuantity = (product) => {
    if (isAvailableForPurchase(products, itemsInCart, product)) {
      let index = itemsInCart.indexOf(product);
      itemsInCart[index].quantity += 1;
      itemsInCart.slice();
      setItemsInCart(itemsInCart.slice());
    } else {
      NotificationManager.warning(
        "You have reached the max amount.",
        product.title,
        2000
      );
    }
  };

  const clearCart = () => {
    // Clearing the cart.
    setItemsInCart([]);
  };

  const purchase = (e) => {
    // updatedProducts - the items (products) with the changed quantity.
    const updatedProducts = updateQuantityInShop(products, itemsInCart);
    updateProductsInDB(updatedProducts);
    clearCart();    
    e.preventDefault();
    NotificationManager.success("Thank you for your purchase.", "");
  };

  const updateProductsInDB = async (products) => {
      await fetch('http://127.0.0.1:3001/item/updateQuantity', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(products),
    })  
  }

  const updateRow = (value) => {
    setShowUpdateProductForm(!showUpdateProductForm);
    setProductToUpdate(value);
  };

  const deleteRow = async (id) => {
    const result = await fetch(`http://127.0.0.1:3001/item/${id}`, {
      method: 'DELETE',
    })

    /* If the deletion is successfull (code 200) we update the collection of products
     by filtering those who are different from the one who has been deleted. Otherwise 
     we'll return the error message. */
    result.status === 200
      ? setProducts(products.filter((pr) => pr._id !== id))
      : NotificationManager.warning(
        "deleting the item. Something is wrong.",
        "Error",
        2000
      );
  };

  const showAddNewProductForm = (product) => {
    setShowAddProduct(!showAddProduct);
  };

  const isAvailableForPurchase = (itemsInShop, itemsInCart, itemToPurchase) => {
    let presentInTheCart = itemsInCart.find(
      (x) => x._id === itemToPurchase._id
    );
    for (let i = 0; i < itemsInShop.length; i++) {
      if (itemsInShop[i]._id === itemToPurchase._id) {
        let available = itemsInShop[i].quantity;
        let needed = 0;
        /* If the item we are adding to the cart is already present there,
        then we sum up the quantity of the item we'd like to buy with that
        present in the cart. */
        if (presentInTheCart) {
          needed = 1 + presentInTheCart.quantity;
        } else {
          needed = itemToPurchase.quantity;
        }
        let newQuantity = available - needed;
        if (newQuantity < 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  const updateQuantityInShop = (itemsInShop, purchasedItems) => {
    /* This method updates the quantity of items in the shop and 
    returns the array of the updated items. The array of the updated 
    items will be passed to API to update the quantity in DB. */
    const updatedItems = [];
    for (let i = 0; i < itemsInShop.length; i++) {
      for (let j = 0; j < purchasedItems.length; j++) {
        if (itemsInShop[i]._id === purchasedItems[j]._id) {
          itemsInShop[i].quantity -= purchasedItems[j].quantity;
          updatedItems.push(itemsInShop[i]);
        }
      }
    }
    return updatedItems;
  };

  const saveNewProduct = async (title, description, price, quantity) => {
    const product = {title: title, description: description, price: price, quantity: quantity}
    await fetch('http://127.0.0.1:3001/item', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  }

  const submitUpdateRowtoDB = async (id, title, description, price, quantity) => {
    const product = {title: title, description: description, price: price, quantity: quantity}
    await fetch(`http://127.0.0.1:3001/item/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  }

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <NotificationContainer />
        <Routes>
          <Route
            path="/cart"
            element={<Cart products={itemsInCart} onClearCart={clearCart} />}
          />
          <Route path="/shop" element={<ProductList products={products} />} />
          <Route
            path="/details/:productID"
            element={
              <ProductDetails products={products} onAddToCart={addToCart} />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                products={itemsInCart}
                onPurchase={purchase}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                showCheckoutForms={showCheckoutForms}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                products={products}
                onUpdateClick={updateRow}
                onDeleteClick={deleteRow}
                onAddClick={showAddNewProductForm}
                onSaveClick={saveNewProduct}
                showAddProduct={showAddProduct}
                showUpdateProductForm={showUpdateProductForm}
                productToUpdate={productToUpdate}
                onSaveUpdateClick={submitUpdateRowtoDB}
              />
            }
          />
          <Route path="/" element={<Greeting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
