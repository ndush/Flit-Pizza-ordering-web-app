import React, { useState } from "react";
import Link from "next/link";
import AdminLogin from "./AdminLogin";
import AddPizzaForm from "./AddPizzaForm";
import { useRouter } from "next/router";

export const pizzas = [
  {
    id: 1,
    name: "PepperoniI",
    image: "/images/l.png",
    price: "$13.99",
    rating: 5,
    description: "Spicy Pepperoni pizza.",
  },
  {
    id: 2,
    name: "MargheritaA",
    image: "/images/5.png",
    price: "$9.99",
    rating: 4,
    description: " Margherita variation.",
  },
  {
    id: 3,
    name: "Vegetarian Delight",
    image: "/images/5.png",
    price: "$12.99",
    rating: 4,
    description: " vegetarian pizzas.",
  },
  {
    id: 4,
    name: "Hawaiian Paradise",
    image: "/images/cious.png",
    price: "$14.99",
    rating: 4,
    description: " Hawaiian pizza.",
  },
  {
    id: 5,
    name: "Chicken Supreme",
    image: "/images/sump.png",
    price: "$15.99",
    rating: 4,
    description: "supreme taste .",
  },
  {
    id: 6,
    name: "BBQ Feast",
    image: "/images/l.png",
    price: "$16.99",
    rating: 5,
    description: "Savor the rich flavors .",
  },
];

const Products = () => {
  const router = useRouter();
  const isProductsPage = router.pathname === "/products";

  const [hoveredStar, setHoveredStar] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAddPizzaForm, setShowAddPizzaForm] = useState(false);

  const handleStarHover = (index) => {
    setHoveredStar(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredStar(null);
  };

  const handleStarClick = (index) => {
    console.log(`You clicked on star ${index + 1}`);
  };

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleAddPizzaClick = () => {
    setShowAddPizzaForm(!showAddPizzaForm);
  };

  const handleCloseFormClick = () => {
    setShowAddPizzaForm(false);
  };

  const filteredAndSortedPizzas = pizzas
    .filter((pizza) => {
      if (filter === "all") {
        return true;
      } else {
        return pizza.description.toLowerCase().includes(filter.toLowerCase());
      }
    })
    .sort((a, b) => {
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
      {isProductsPage && (
        <AdminLogin
          onLogin={handleLogin}
          onLogout={handleLogout}
          isAdminLoggedIn={isAdminLoggedIn}
        />
      )}

      <div className="flex items-center mb-4"></div>

      <button className="button mt-4" onClick={handleAddPizzaClick}>
        Add New Pizza
      </button>

      <AddPizzaForm
        showForm={showAddPizzaForm}
        onCloseFormClick={handleCloseFormClick}
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredAndSortedPizzas.map((pizza) => (
          <div key={pizza.id} className="border p-4 flex flex-col items-center">
            <Link href={`/product/${pizza.id}`} passHref>
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-40 object-contain mb-2"
              />
            </Link>
            <p className="text-center mb-2">
              <b>{pizza.name}</b>{" "}
              <span style={{ color: "red" }}>{pizza.price}</span>
            </p>
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
            <Link href={`/product/${pizza.id}`} passHref>
              <button className="button">
                <img
                  src="/images/n.png"
                  alt="Cart Icon"
                  className="w-3 h-3 cursor-pointer"
                />
                ORDER NOW
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
