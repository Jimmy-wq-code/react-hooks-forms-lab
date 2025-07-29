import React, { useState } from "react";
import { v4 as uuid } from "uuid"; // for generating unique item IDs
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemData, setItemData] = useState(items); // local copy of items that can be updated

  // handle search text input change
  function onSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // handle category dropdown change
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // handle form submission (add new item)
  function handleItemFormSubmit(newItemData) {
    const newItem = {
      id: uuid(), // generate unique ID
      name: newItemData.name,
      category: newItemData.category,
    };
    setItemData([...itemData, newItem]); // update local list
  }

  // filter by both category and search term
  const itemsToDisplay = itemData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        search={searchTerm}
        onSearchChange={onSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;