import React, { useState } from "react";
import { useRouter } from "next/router";
import { pizzas } from "../products";
import { useCart } from "../../components/CartContext";
import { FiHeart } from 'react-icons/fi';


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
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div>
        <h1>{product.name}</h1>
        <p style={{ fontWeight: "bold" }}> {product.price}</p>
        <p>{product.rating} reviews</p>
        <p>{product.description}</p>

        <div style={{ marginTop: "20px" }}>
          <h2>Choose Pizza Size</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <button
                onClick={() => handleSizeChange("small")}
                style={{
                  background: "red",
                  height: "12px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "10px",
                }}
              >
                Small
              </button>
              <img
                src="/images/Pizza-icon_ns1nad.png"
                alt="Small Pizza"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <div>
              <button
                onClick={() => handleSizeChange("medium")}
                style={{
                  background: "red",
                  height: "12px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "10px",
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
                onClick={() => handleSizeChange("large")}
                style={{
                  background: "red",
                  height: "12px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "10px",
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
          <h2>Choose Additional Ingredients</h2>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
           
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
                  width: "100px",
                  paddingRight: "20px",
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
            <button onClick={handleAddToCart} className="button">
              ADD TO CART
            </button>
            <div
  style={{
    background: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    borderWidth: "1px",
                    marginRight: "5px",  
  }}
>
  <FiHeart
    size={20}
    color="black"
    
  />
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
