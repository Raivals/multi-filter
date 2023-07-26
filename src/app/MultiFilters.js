"use client"

import React, { useEffect, useState } from "react"
import { items } from "./items"
import "./style.css"

export default function MultiFilters() {
  const [selectedFilters, setSelectedFilters] = useState([])
  const [filteredItems, setFilteredItems] = useState(items)
  // update based on selected filters
  let filters = ["Bags", "Watches", "Sports", "Sunglasses"]

  const handleFilterButtonClick = (selectedCategory) => {
    // if selected category is already present in selected filters : filter that categoory out and update the selected filter
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory)
      setSelectedFilters(filters)
      // if the category doesn't exist in selected filters : add it to the selected filter
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory])
    }
  }

  // Update the list of items displayed
  useEffect(() => {
    filterItems()
  }, [selectedFilters])

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory)
        return temp
      })
      setFilteredItems(tempItems.flat())
    } else {
      setFilteredItems([...items])
    }
  }

  return (
    <div>
      <div className="buttons-container">
        {filters.map((category, index) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`}
            key={`filters-${index}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredItems.map((items, index) => (
          <div key={`items-${index}`} className="item">
            <p>{items.name}</p>
            <p className="category">{items.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
