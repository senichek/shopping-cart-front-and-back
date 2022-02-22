import React from 'react'

function Greeting() {
  return (
    <>
    <div className='landing-div-1'>
        <h1>Online store app (REACT)</h1>
        <h2>
        The idea and layout of this app is taken from the <a href="https://angular.io/start">Angular's official guide</a> (it's not a typo). 
        I've recreated <br></br> the app (with a couple of modifications) using <a href="https://reactjs.org/">React</a> for my training purposes.
        <br></br>There are also tests using CYPRESS for frontend and JEST and SUPERTEST for backend.
        </h2>
        <form action="/shop">
         <button type="submit">START</button>
      </form>
    </div>

    <div className='landing-container'>
        <div className='landing-div-2'> <h1>Features of the app:</h1>
        <ul>
            <li> <h3>See the list of available products</h3> </li>
            <li> <h3>See the details of the specific product</h3> </li>
            <li> <h3>Be notified when the price drops below certain point</h3> </li>
            <li> <h3>Modify the amount of products in your cart </h3> </li>
            <li> <h3> Log in as admin to manage the list of products (CRUD)</h3> </li>
        </ul> 
        </div>

        <div className='landing-div-3'> <h1>Backend</h1>
        <h2>The backend is REST API which is created using Node.js, Express <br></br> and MongoDB.
         Both projects are deployed in Docker containers.</h2>
        <form action="https://shopping-cart-rest-api.herokuapp.com/api-docs/">
         <button type="submit">Swagger doc</button>
      </form>
      <br></br>
      <form action="https://github.com/senichek/shopping-cart-react.git">
         <button type="submit">GitHub link</button>
      </form>
      <br></br>
        </div>
    </div>
    </>
  )
}

export default Greeting