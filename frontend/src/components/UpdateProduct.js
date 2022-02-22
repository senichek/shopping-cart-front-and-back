import React from 'react';
import { useRef } from 'react'; // It allows to reference the elements of html page.
import Button from './Button';

function UpdateProduct({ onSaveUpdateClick, onCancelClick, productToUpdate }) {
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    // Добавить невидимое поле с ID продукта
    return <div>
        <form>
          <div className="form-control">
            <input ref={idRef} type="hidden" defaultValue={productToUpdate._id} required />
            <input ref={titleRef} type="text" defaultValue={productToUpdate.title} required />
          </div>
          <div className="form-control">
            <input ref={descriptionRef} type="text" defaultValue={productToUpdate.description} required />
          </div>
          <div className="form-control">
            <input ref={priceRef} type="number" min={0} placeholder="Price" defaultValue={productToUpdate.price} required />
          </div>
          <div className="form-control">
            <input ref={quantityRef} type="number" min={0} placeholder="Quantity" defaultValue={productToUpdate.quantity}  required />
          </div>
          <Button
            color={"green"}
            text={"Save change"}
            click={() => onSaveUpdateClick(idRef.current.value, titleRef.current.value, descriptionRef.current.value, priceRef.current.value, quantityRef.current.value)}
          />
          &nbsp;
          <Button
            color={"#1976d2"}
            text={"Cancel"}
            click={onCancelClick}
          />
        </form>
    </div>;
  }

export default UpdateProduct;
