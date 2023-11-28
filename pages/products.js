import React, { useState } from "react";
import Link from "next/link"; 



export const pizzas = [
  {
    id: 1,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
  {
    id: 2,
    name: "MargheritaA",
    image: "/images/5.png",
    price: "9.99",
    rating: 4,
    description: "Another Margherita variation.",
  },
  {
    id: 3,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
  {
    id: 4,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
  {
    id: 5,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "$13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
  {
    id: 6,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
];

const Products = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'vegetarian', 'spicy', etc.
  const [sortOption, setSortOption] = useState("name"); // 'name', 'price', 'rating'

  const handleStarHover = (index) => {
    setHoveredStar(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredStar(null);
  };

  const handleStarClick = (index) => {
    console.log(`You clicked on star ${index + 1}`);
  };

  // Filter and sort pizzas based on the selected options
  const filteredAndSortedPizzas = pizzas
    .filter((pizza) => {
      if (filter === "all") {
        return true;
      } else {
        // Add your specific filter logic based on pizza properties
        return pizza.description.toLowerCase().includes(filter.toLowerCase());
      }
    })
    .sort((a, b) => {
      // Sort pizzas based on the selected sorting option
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "price") {
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      }
    });

  return (
    <div>
      {/* Filter and sorting controls */}
      <div className="flex items-center mb-4">
        {/* Filter button */}
        <button onClick={() => setFilter("all")} className="button mr-4">
          <img
            src="/images/ii.png"
            alt="Cart Icon"
            className="w-3 h-3 cursor-pointer"
          />
          Filter
        </button>

        {/* Total number of pizzas text */}
        <p className="mr-2 ml-auto">Showing all {pizzas.length} results</p>

        {/* Sorting dropdown */}
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mr-2"
        >
          <option value="name">Default Sorting</option>
          <option value="price">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Display pizzas */}
      <div className="grid grid-cols-3 gap-4">
        {filteredAndSortedPizzas.map((pizza) => (
          <div key={pizza.id} className="border p-4 flex flex-col items-center">
            {/* Use Link to navigate to the product details page */}
            <Link href={`/product/${pizza.id}`} passHref>
              
              
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-40 object-contain mb-2"
                />
              
            </Link>
            <p className="text-center mb-2">{pizza.name}</p>
            <p className="text-center mb-2">{pizza.price}</p>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  className={`cursor-pointer ${
                    index <= (hoveredStar || pizza.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => handleStarHover(index)}
                  onMouseLeave={handleStarLeave}
                  onClick={() => handleStarClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-center mb-2">{pizza.description}</p>
            <button className="button">
              <img
                src="/images/n.png"
                alt="Cart Icon"
                className="w-3 h-3 cursor-pointer"
              />
              ORDER NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;