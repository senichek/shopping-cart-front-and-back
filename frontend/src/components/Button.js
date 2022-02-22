const Button = ({color, text, click}) => {
    // onClick we will use the property <click> (we can use any custom name for property) which is passed from the <Product> component.
    return <button onClick={click} style={{backgroundColor: color}} className='btn'>{text}</button>;
  };
  
  export default Button;