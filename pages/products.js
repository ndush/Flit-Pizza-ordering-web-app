import React, { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AddPizzaForm from "./AddPizzaForm";

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

  const handleAddPizzaClick = () => {
    setShowAddPizzaForm(!showAddPizzaForm);
  };

  const handleCloseFormClick = () => {
    setShowAddPizzaForm(false);
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterButtonClick = () => {
    console.log("Filter button clicked");
    // Perform filtering logic here (if needed)
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
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

  useEffect(() => {
    console.log("isProductsPage:", isProductsPage);
    console.log("filteredAndSortedPizzas:", filteredAndSortedPizzas);
  }, [isProductsPage, filteredAndSortedPizzas]);

  return (
    <div>
    {isProductsPage && (
      <div className="mt-40 flex justify-between items-center ">
        <div >
          <button className="button" onClick={handleFilterButtonClick}>
            <img
              src="/images/ii.png"
              alt="Filter Icon"
              className="w-4 h-4 mr-2"
            />
            Filter
          </button>
        </div>
        <div className="flex items-center relative z-10">
          <p className="mr-2">
            Showing all {filteredAndSortedPizzas.length} results
          </p>
          <select
            className="p-2 border"
            value={sortOption}
            onChange={handleSortOptionChange}
          >
            <option value="">Sort by</option>
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>
    )}

    <button className="button mt-4" onClick={handleAddPizzaClick}>
      Add New Pizza
    </button>

    <AddPizzaForm
      showForm={showAddPizzaForm}
      onCloseFormClick={handleCloseFormClick}
    />

<div className="grid grid-cols-3 gap-4">
  {filteredAndSortedPizzas.map((pizza) => (
    <div key={pizza.id} className="border p-4 flex flex-col">
      <Link href={`/product/${pizza.id}`} passHref>
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-40 object-contain mb-2 cursor-pointer"
        />
      </Link>
      <p className="mb-2">
        <b className="font-semibold text-sm">{pizza.name}</b>
        <span style={{ color: "red" }} className="font-semibold ml-2">
          {pizza.price}
        </span>
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
      <p className="mb-2">{pizza.description}</p>
      <Link href={`/product/${pizza.id}`} passHref>
        <button className="button">
          <img
            src="/images/n.png"
            alt="Cart Icon"
            className="w-3 h-3 cursor-pointer mr-1"
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