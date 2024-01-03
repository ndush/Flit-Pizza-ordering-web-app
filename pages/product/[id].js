import React, { useState } from "react";
import { useRouter } from "next/router";
import { pizzas } from "../products";
import { useCart } from "../../components/CartContext";
import { FiHeart } from "react-icons/fi";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [itemCount, setItemCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedIngredients, setSelectedIngredients] = useState({
    sauce: false,
  });

  const handleItemCountChange = (amount) => {
    const newCount = Math.max(1, itemCount + amount);
    setItemCount(newCount);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: !prevIngredients[ingredient],
    }));
  };

  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>;
  }

  const productId = String(id);
  const product = pizzas.find((product) => String(product.id) === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      quantity: itemCount,
      ingredients: selectedIngredients,
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "70px",
      }}
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "50%", height: "auto" }}
        />
      </div>

      <div>
        <h1 style={{ fontSize: "16px" }}>{product.name}</h1>
        <div>
          <p
            style={{
              fontWeight: "bold",
              color: "red",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            {product.price}
          </p>
          <p style={{ display: "inline-block", color: "grey" }}>
            {product.rating} reviews
          </p>
        </div>

        <p>{product.description}</p>

        <div style={{ marginTop: "20px" }}>
          <h2>Choose Pizza Size</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <button
                className="pizza_size"
                onClick={() => handleSizeChange("small")}
                style={{
                  background: "red",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "9px",
                  padding: "1px 1px",
                }}
              >
                Small
              </button>
              <img
                src="/images/Pizza-icon_ns1nad.png"
                alt="Small Pizza"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </div>

            <div>
              <button
                className="pizza_size"
                onClick={() => handleSizeChange("medium")}
                style={{
                  background: "red",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "9px",
                  padding: "1px 1px",
                  marginRight: "auto",
                }}
              >
                Medium
              </button>
              <img
                src="/images/Pizza-icon_ns1nad.png"
                alt="Medium Pizza"
                style={{ width: "30px", height: "30px" }}
              />
            </div>

            <div>
              <button
                className="pizza_size"
                onClick={() => handleSizeChange("large")}
                style={{
                  background: "red",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "9px",
                  padding: "1px 1px",
                  marginRight: "auto",
                }}
              >
                Large
              </button>
              <img
                src="/images/Pizza-icon_ns1nad.png"
                alt="Large Pizza"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h2>Choose Additional Ingredients</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedIngredients.sauce}
                onChange={() => handleIngredientChange("sauce")}
              />
              Sauce
            </label>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              style={{
                marginTop: "10px",
                position: "relative",
                display: "inline-block",
              }}
            >
              <input
  type="text"
  value={itemCount}
  style={{
    border: "1px solid #ccc",
    outline: "none",
    width: "80px",
    padding: "5px", 
    fontSize: "12px", 
  }}
  readOnly
/>

              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <button
                  onClick={() => handleItemCountChange(1)}
                  style={{
                    cursor: "pointer",
                    padding: "2px",
                    border: "none",
                    background: "transparent",
                    fontSize: "7px",
                  }}
                >
                  &#9650;
                </button>
                <button
                  onClick={() => handleItemCountChange(-1)}
                  style={{
                    cursor: "pointer",
                    padding: "2px",
                    border: "none",
                    background: "transparent",
                    fontSize: "7px",
                  }}
                >
                  &#9660;
                </button>
              </div>
            </div>
            <div>
             
              <button className="button " onClick={handleAddToCart} style = {{ marginTop: "20px"}}>
                ADD TO CART
              </button>
            </div>

            <div
              style={{
                background: "white",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
                marginRight: "5px",
                marginTop: "20px",
              }}
            >
              <FiHeart size={10} color="black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
