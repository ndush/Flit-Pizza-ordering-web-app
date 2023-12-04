
import React from 'react';

const AddPizzaForm = ({ showForm, onCloseFormClick }) => {
    const handleAddPizza = (e) => {
        e.preventDefault(); 
      };
  return (
    <div className={`pizza-form ${showForm ? 'show' : 'hide'}`}>
      <h2>Add New Pizza</h2>
      <label htmlFor="pizzaImage">Choose Pizza Image:</label>
      <input type="file" id="pizzaImage" />

      <label htmlFor="pizzaTitle">Pizza Title:</label>
      <input type="text" id="pizzaTitle" />

      <label htmlFor="pizzaDescription">Pizza Description:</label>
      <input type="text" id="pizzaDescription" />

      <label htmlFor="smallPrice"> Pizza Prices</label>
      <input type="text" id="smallPrice" placeholder="Small" />

     
      <input type="text" id="mediumPrice" placeholder="Medium" />

    
      <input type="text" id="largePrice" placeholder="Large" />

      <label htmlFor="extraItem">Extra </label>
      <input type="text" id="extraItem" placeholder="Item" />

      
      <input type="text" id="extraPrice" placeholder="Price" />

     
      <button className ="add">Add </button>
      <button onClick={onCloseFormClick} className ="close">Close</button>
      <button className ="create">Create Pizza</button>
    </div>
  );
};

export default AddPizzaForm;
