import Product from "./Product";

function ProductList({ products }) {
  return <>
      {products.map((pr) => {
          return <Product key={pr._id} product={pr}/>
      })}
  </>;
}

export default ProductList;
