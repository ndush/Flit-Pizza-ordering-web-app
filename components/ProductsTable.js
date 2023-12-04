import React from "react";

const ProductsTable = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      quantity: 10,
      category: "Electronics",
    },
   
  ];

  const handleEdit = (productId) => {
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Deleting product with ID: ${productId}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          width: "80%",
          padding: "16px",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "none" }}>
                <img
                  src="/path/to/your/image.jpg"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td style={{ border: "none" }}>{product.id}</td>
              <td style={{ border: "none", whiteSpace: "nowrap" }}>
                {product.name}
              </td>
              <td style={{ border: "none" }}>${product.price.toFixed(2)}</td>
              <td style={{ border: "none", whiteSpace: "nowrap" }}>
                <button
                  onClick={() => handleEdit(product.id)}
                  style={{
                    marginRight: "8px",
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
