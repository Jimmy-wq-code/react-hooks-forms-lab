import React, { useState } from "react";
import { v4 as uuid } from "uuid"; // import uuid for unique ID generation
function ItemForm({ onItemFormSubmit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce"); // initial value as specified

  function handleSubmit(event) {
    event.preventDefault();

    const newItemData = {
      id: uuid(), // generate unique ID
      name: name,
      category: category,
    };

    onItemFormSubmit(newItemData); // callback to parent
    setName(""); // reset form fields after submit
    setCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name} // controlled input
          onChange={(e) => setName(e.target.value)} // update state
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category} // controlled input
          onChange={(e) => setCategory(e.target.value)} // update state
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;